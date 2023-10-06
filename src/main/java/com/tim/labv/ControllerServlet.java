package com.tim.labv;

import com.tim.labv.models.Hit;
import com.tim.labv.service.JsonService;
import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.LinkedList;

@WebServlet(name = "controllerServlet", value = "/hit")
public class ControllerServlet extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        double x;
        double y;
        double r;
        try {
            StringBuilder sb = new StringBuilder();
            BufferedReader reader = request.getReader();
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line);
            }
            String requestBody = sb.toString();
            JSONObject jo = new JSONObject(requestBody);
            x = jo.getDouble("X");
            y = jo.getDouble("Y");
            r = jo.getDouble("R");

            if (x < -5 || x > 3 || y < -5 || y > 3 || r < 1 || r > 3) {
                throw new Exception("invalid parameters");
            }
        } catch (Exception e) {
            response.sendRedirect("http://localhost:8080/labv-1.0-SNAPSHOT/");
            return;
        }
        request.setAttribute("X", x);
        request.setAttribute("Y", y);
        request.setAttribute("R", r);
        RequestDispatcher rd = getServletContext().getRequestDispatcher("/internal");
        rd.forward(request, response);
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        var session = request.getSession();
        var hits = session.getAttribute(AreaCheckServlet.hitAttributeNameSession) == null ? null
                : (LinkedList<Hit>) session.getAttribute(AreaCheckServlet.hitAttributeNameSession);
        PrintWriter out = response.getWriter();
        if (hits == null) {
            out.print("{}");
            out.flush();
            return;
        }
        else{
            out.print(JsonService.formJsonString(hits));
        }
        out.flush();
    }
}

