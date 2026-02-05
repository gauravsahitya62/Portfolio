package com.portfolio.model;

import jakarta.validation.constraints.NotBlank;

public class About {

    private String id = "about";

    @NotBlank
    private String headline;

    @NotBlank
    private String summary;

    @NotBlank
    private String location;

    private String avatarUrl;

    public String getId() {
        return id;
    }

    public String getHeadline() {
        return headline;
    }

    public void setHeadline(String headline) {
        this.headline = headline;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }
}

