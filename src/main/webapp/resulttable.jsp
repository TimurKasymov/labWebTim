<%--
  Created by IntelliJ IDEA.
  User: kasym
  Date: 10/3/2023
  Time: 6:23 PM
  To change this template use File | Settings | File Templates.
--%>
<%@page import="com.tim.labv.models.Hit"%>
<%@ page import="java.util.LinkedList" %>
<%@ page import="java.time.format.DateTimeFormatter" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<body>
<%
    Hit last = ((LinkedList<Hit>)request.getAttribute("list")).getLast();
%>
<h1 style="text-align: center"><%= last.isSuccess() ? "You hit the target! Congrats!" : "You missed the target, so try again" %> </h1>
<h1 style="text-align: center"><a href="http://localhost:8080/labv-1.0-SNAPSHOT">Make another hit! </a></h1>
<table class="resultTable">
    <tr class="resultTableRows">
        <th class="textAlign"><b>X</b></th>
        <th class="textAlign"><b>Y</b></th>
        <th class="textAlign"><b>Radios</b></th>
        <th class="textAlign"><b>Success</b></th>
        <th class="textAlign"><b>Process time in nanoseconds</b></th>
        <th class="textAlign"><b>Date</b></th>
    </tr>
    <%
        LinkedList<Hit> std = (LinkedList<Hit>)request.getAttribute("list");
        for(Hit s:std){%>
    <tr>
        <td style="text-align: center"><%=s.getX()%></td>
        <td style="text-align: center"><%=s.getY()%></td>
        <td style="text-align: center"><%=s.getR()%></td>
        <td style="text-align: center"><%=s.isSuccess() ? "True" : "False"%></td>
        <td style="text-align: center"><%=s.getProcessTime()%> n</td>
        <td style="text-align: center"><%=s.getDate().format(DateTimeFormatter.ofPattern("y.M.d H:m:s"))%></td>
    </tr>
    <%}%>
</table>
</body>
