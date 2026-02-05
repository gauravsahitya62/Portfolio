package com.portfolio.model;

import jakarta.validation.constraints.NotBlank;

public class SocialLink {

    private String id;

    @NotBlank
    private String label;

    @NotBlank
    private String url;

    private String icon; // e.g. github, linkedin, twitter

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }
}

