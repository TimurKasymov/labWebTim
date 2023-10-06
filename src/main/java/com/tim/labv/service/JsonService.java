package com.tim.labv.service;

import com.tim.labv.models.Hit;

import java.time.format.DateTimeFormatter;
import java.util.List;

public class JsonService {
    public static String formJsonString(List<Hit> hits) {
        var strBuilder = new StringBuilder();
        strBuilder.append("[");
        for (var hit : hits) {
            strBuilder.append("{");
            var x = "\"X\": " + hit.getX() + ",";
            strBuilder.append(x);

            var y = "\"Y\": " + hit.getY() + ",";
            strBuilder.append(y);

            var r = "\"R\": " + hit.getR() + ",";
            strBuilder.append(r);

            var success = "\"success\": " + (hit.isSuccess() ? "true" : "false") + ",";
            strBuilder.append(success);

            var processTime = "\"process_time\": " + hit.getProcessTime() + ",";
            strBuilder.append(processTime);

            var date = "\"date\": " + "\"" + hit.getDate().format(DateTimeFormatter.ofPattern("y.M.d H:m:s")) + "\"";
            strBuilder.append(date);
            strBuilder.append("},");
        }
        strBuilder.deleteCharAt(strBuilder.length()-1);
        strBuilder.append("]");
        return strBuilder.toString();
    }
}
