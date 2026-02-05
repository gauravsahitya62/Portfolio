package com.portfolio.service;

import com.portfolio.model.About;
import com.portfolio.model.Project;
import com.portfolio.model.SocialLink;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class PortfolioService {

    private About about;

    private final Map<String, Project> projects = new ConcurrentHashMap<>();
    private final Map<String, SocialLink> links = new ConcurrentHashMap<>();
    private final AtomicLong idSequence = new AtomicLong(1);

    public PortfolioService() {
        seedDefaults();
    }

    private void seedDefaults() {
        About defaultAbout = new About();
        defaultAbout.setHeadline("Gaurav Sahitya · Software Developer");
        defaultAbout.setSummary(
                "Professional software developer with strong experience in Java, Spring Boot, and modern web technologies. " +
                "I architect and deliver scalable, production-grade solutions, from AI-powered ticketing systems to logistics and real estate platforms."
        );
        defaultAbout.setLocation("Bengaluru, Karnataka, India");
        defaultAbout.setAvatarUrl("");
        this.about = defaultAbout;

        Project ticketing = new Project();
        ticketing.setId(nextId());
        ticketing.setTitle("AI-based Ticketing & Support Platform");
        ticketing.setDescription(
                "Enterprise ticketing system with brand-wise segregation, automated email-to-ticket conversion, " +
                "and intelligent chat support using OpenAI and AWS Textract."
        );
        ticketing.setGithubUrl("");
        ticketing.setLiveUrl("");
        ticketing.setTags(new String[]{"Java", "Spring Boot", "REST APIs", "AWS Textract", "OpenAI"});
        projects.put(ticketing.getId(), ticketing);

        Project realEstate = new Project();
        realEstate.setId(nextId());
        realEstate.setTitle("Real Estate Data & Mapping Platform");
        realEstate.setDescription(
                "High-performance real estate platform built with Java and Spring Boot, integrating Google Maps and MLS feeds " +
                "to deliver accurate, real-time property data and rich map visualisations."
        );
        realEstate.setGithubUrl("");
        realEstate.setLiveUrl("");
        realEstate.setTags(new String[]{"Java", "Spring Boot", "Google Maps API", "MLS Feeds"});
        projects.put(realEstate.getId(), realEstate);

        Project logistics = new Project();
        logistics.setId(nextId());
        logistics.setTitle("Logistics & Package Delivery System");
        logistics.setDescription(
                "Logistics solution for a Kuwait-based enterprise with real-time package tracking and integrations " +
                "with multiple third-party delivery partners."
        );
        logistics.setGithubUrl("");
        logistics.setLiveUrl("");
        logistics.setTags(new String[]{"Java", "Spring Boot", "REST APIs", "Logistics"});
        projects.put(logistics.getId(), logistics);

        SocialLink github = new SocialLink();
        github.setId(nextId());
        github.setLabel("GitHub");
        github.setUrl("https://github.com/gauravsahitya62");
        github.setIcon("github");
        links.put(github.getId(), github);

        SocialLink linkedin = new SocialLink();
        linkedin.setId(nextId());
        linkedin.setLabel("LinkedIn");
        linkedin.setUrl("https://linkedin.com/in/gaurav-sahitya/");
        linkedin.setIcon("linkedin");
        links.put(linkedin.getId(), linkedin);
    }

    private String nextId() {
        return String.valueOf(idSequence.getAndIncrement());
    }

    // About

    public About getAbout() {
        return about;
    }

    public About updateAbout(About updated) {
        this.about = updated;
        return this.about;
    }

    private static final String UPLOADS_DIR = "uploads";
    private static final String AVATAR_FILENAME = "avatar";

    public About saveAboutPhoto(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) {
            return about;
        }
        Path dir = Paths.get(UPLOADS_DIR);
        Files.createDirectories(dir);
        try (var stream = Files.list(dir)) {
            stream.filter(p -> p.getFileName().toString().startsWith(AVATAR_FILENAME))
                    .forEach(p -> {
                        try { Files.delete(p); } catch (IOException ignored) { }
                    });
        }
        String originalFilename = file.getOriginalFilename();
        String ext = originalFilename != null && originalFilename.contains(".")
                ? originalFilename.substring(originalFilename.lastIndexOf('.'))
                : ".jpg";
        Path target = dir.resolve(AVATAR_FILENAME + ext);
        file.transferTo(target.toFile());
        about.setAvatarUrl("/api/about/photo");
        return about;
    }

    public Resource getAboutPhotoResource() throws IOException {
        Path dir = Paths.get(UPLOADS_DIR);
        if (!Files.exists(dir)) {
            return null;
        }
        try (var stream = Files.list(dir)) {
            Optional<Path> found = stream
                    .filter(p -> p.getFileName().toString().startsWith(AVATAR_FILENAME))
                    .findFirst();
            if (found.isEmpty()) {
                return null;
            }
            return new FileSystemResource(found.get().toFile());
        }
    }

    // Projects

    public List<Project> listProjects() {
        return new ArrayList<>(projects.values());
    }

    public Project createProject(Project project) {
        String id = nextId();
        project.setId(id);
        projects.put(id, project);
        return project;
    }

    public Project updateProject(String id, Project project) {
        if (!projects.containsKey(id)) {
            throw new NoSuchElementException("Project not found");
        }
        project.setId(id);
        projects.put(id, project);
        return project;
    }

    public void deleteProject(String id) {
        projects.remove(id);
    }

    // Social links

    public List<SocialLink> listLinks() {
        return new ArrayList<>(links.values());
    }

    public SocialLink createLink(SocialLink link) {
        String id = nextId();
        link.setId(id);
        links.put(id, link);
        return link;
    }

    public SocialLink updateLink(String id, SocialLink link) {
        if (!links.containsKey(id)) {
            throw new NoSuchElementException("Link not found");
        }
        link.setId(id);
        links.put(id, link);
        return link;
    }

    public void deleteLink(String id) {
        links.remove(id);
    }
}

