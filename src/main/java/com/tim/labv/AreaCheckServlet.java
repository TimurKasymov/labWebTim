package com.tim.labv;

import com.tim.labv.models.Hit;
import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.LinkedList;

@WebServlet(name = "areaCheckServlet", value = "/internal")
public class AreaCheckServlet extends HttpServlet {
    static final String hitAttributeNameSession = "hits";

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        long processTimeStart = System.nanoTime();

        double x = (double)request.getAttribute("X");
        double y = (double)request.getAttribute("Y");
        double r = (double)request.getAttribute("R");

        var success = false;
        if (x >= 0 && y >= 0) {
            if (y <= r && x <= r / 2) {
                success = true;
            }
        }

        if (x >= 0 && y <= 0) {
            if (x <= r && y >= -(r - x)) {
                success = true;
            }
        }

        if (y <= 0 && x <= 0) {
            if (Math.pow(x, 2) + Math.pow(y, 2) <= Math.pow(r, 2)) {
                success = true;
            }
        }
        var session = request.getSession();
        var hits = session.getAttribute(hitAttributeNameSession) == null ? null
                : (LinkedList<Hit>) session.getAttribute(hitAttributeNameSession);
        if (hits == null) {
            hits = new LinkedList<Hit>();
            session.setAttribute(hitAttributeNameSession, hits);
        }
        var processTimeEnd = System.nanoTime();
        var duration = processTimeEnd - processTimeStart;
        var newHit = new Hit(x, y, r, success, duration);
        hits.add(newHit);
        request.setAttribute("list", hits);
        RequestDispatcher rd = getServletContext().getRequestDispatcher("/resulttable.jsp");
        rd.include(request, response);
    }

}
