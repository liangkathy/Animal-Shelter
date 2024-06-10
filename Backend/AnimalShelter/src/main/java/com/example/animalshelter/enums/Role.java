package com.example.animalshelter.enums;

public enum Role {
    ADMIN ("ADMIN"),
    USER ("USER");

    private String role;

    //provide string of enum
    private Role (String s) {
        role = s;
    }

    private boolean equalsRole(String s){
        return role.equals(s);
    }

    @Override
    public String toString(){
        return this.role;
    }
}
