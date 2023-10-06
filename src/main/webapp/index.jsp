<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
<table class="main-table">
    <tr class="name-group">
        <th class="name"><p>Kasymov Timur Shavkatovich</p></th>
        <th  class="group"><p>P3210</p></th>
        <th class="variant"><p>368282</p></th>
    </tr>
    <tr class="coordinates-table-container">
        <td class="coordinates-container">
                        <canvas id="cnv">
                        </canvas>
                        <canvas id="cnv1">
                        </canvas>
                        <canvas id="cnv2">
                        </canvas>
                        <canvas id="cnv3">
                        </canvas>
                        <canvas id="cnv4">
                        </canvas>
        </td>
        <td class="table-container" colspan="2">
            <table class="second-table">
                <th class="x-title"><p>SELECT X: </p></th>
                <tr>
                    <td class="x-container">
                        <button class="btn">-5</button>
                        <button class="btn">-4</button>
                        <button class="btn">-3</button>
                        <button class="btn">-2</button>
                        <button class="btn">-1</button>
                        <button class="btn">0</button>
                        <button class="btn">1</button>
                        <button class="btn">2</button>
                        <button class="btn">3</button>
                    </td>
                </tr>
                <tr>
                    <td class="y-container">
                        <h3 style="padding-top: 30px">SELECT Y:</h3> <input type="text" class="y-input" placeholder="type some sumber -5..3">
                    </td>
                </tr>
                <tr>
                    <td class="r-container">
                        <h3>SELECT R:</h3>
                        <select class="select-items">
                            <option value="1">1</option>
                            <option value="1.5">1.5</option>
                            <option value="2">2</option>
                            <option value="2.5">2.5</option>
                            <option value="3">3</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td class="submit-container">
                        <button class="strike"></button>
                    </td>
                </tr>
            </table>
            </th>
    </tr>
<script src="script.js"></script>
</body>
</html>