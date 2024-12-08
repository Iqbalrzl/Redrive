package com.Redrive.Backend.auth;

public enum Permission {

    ADMIN_READ("admin:read"),
    ADMIN_UPDATE("admin:update"),
    ADMIN_CREATE("admin:create"),
    ADMIN_DELETE("admin:delete"),
    USER_READ("user:read"),
    USER_UPDATE("user:update"),
    USER_CREATE("user:create"),
    USER_DELETE("user:delete"),
    CUSTOMER_READ("customer:read"),
    CUSTOMER_UPDATE("customer:update"),
    CUSTOMER_CREATE("customer:create"),
    CUSTOMER_DELETE("customer:delete");

    private final String permission;

    Permission(String permission) {
        this.permission = permission;
    }

    public String getPermission() {
        return permission;
    }
}