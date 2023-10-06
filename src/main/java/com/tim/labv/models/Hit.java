package com.tim.labv.models;

import java.io.Serializable;
import java.time.LocalDateTime;

public class Hit implements Serializable {
    private double x;
    private double y;
    private double r;
    private boolean success;
    private long processTime;
    private LocalDateTime date;
    public Hit(double x, double y, double r, boolean success, long processTime) {
        this.date = LocalDateTime.now();
        this.processTime = processTime;
        this.success = success;
        this.x = x;
        this.y = y;
        this.r = r;
    };

    public double getX() {
        return x;
    }

    public double getR() {
        return r;
    }

    public double getY() {
        return y;
    }

    public boolean isSuccess() {
        return success;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public long getProcessTime() {
        return processTime;
    }

}

