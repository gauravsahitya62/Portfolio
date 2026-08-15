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
        defaultAbout.setHeadline("Gaurav Sahitya");
        defaultAbout.setSummary(
                "Senior Engineer with 4+ years of experience designing and scaling distributed backend systems using Java, Spring Boot, and Microservices. " +
                "I specialize in REST API latency optimization, AWS cloud integrations, and AI-assisted engineering workflows that drive 35%+ system performance gains.\n\n" +
                "I architect production platforms end to end — AI automation engines processing thousands of requests a month, document-ingestion pipelines with zero data loss, and microservices that scale to 10,000+ monthly users. Reliability, latency, and maintainability matter more to me than quick hacks.\n\n" +
                "While my core strength is Java and Spring Boot, I also ship React.js interfaces, AWS integrations (S3, Lambda, API Gateway, Textract), and automated test suites with JUnit and Mockito. I enjoy tightening query paths, designing clean service boundaries, and turning complex requirements into durable systems.\n\n" +
                "Outside of code, I value problem-solving, continuous learning, and teamwork. Whether it is refining system design, debugging production issues, or accelerating delivery with Cursor and Amazon Q, I thrive in environments that push for technical excellence and real-world impact."
        );
        defaultAbout.setLocation("Bengaluru, Karnataka, India");
        defaultAbout.setAvatarUrl("");
        this.about = defaultAbout;

        Project automation = new Project();
        automation.setId(nextId());
        automation.setTitle("AI Systems Automation Platform");
        automation.setDescription(
                "Spring Boot automation engine processing 5,000+ requests/month with intelligent routing, cutting manual support overhead by 60%. " +
                "Built admin filtering with Spring AOP to speed structural data retrieval by 30%."
        );
        automation.setGithubUrl("");
        automation.setLiveUrl("");
        automation.setTags(new String[]{"Java", "Spring Boot", "Spring AOP", "OpenAI", "REST APIs"});
        projects.put(automation.getId(), automation);

        Project invoices = new Project();
        invoices.setId(nextId());
        invoices.setTitle("Automated Invoice Ingestion Pipeline");
        invoices.setDescription(
                "Asynchronous document pipeline integrating OpenAI and AWS Textract to ingest 1,000+ invoices/month with zero data loss. " +
                "Handles extraction, validation, and downstream processing for finance operations."
        );
        invoices.setGithubUrl("");
        invoices.setLiveUrl("");
        invoices.setTags(new String[]{"AWS Textract", "OpenAI", "Lambda", "S3", "Spring Boot"});
        projects.put(invoices.getId(), invoices);

        Project realEstate = new Project();
        realEstate.setId(nextId());
        realEstate.setTitle("Real Estate Microservices Platform");
        realEstate.setDescription(
                "Refactored a legacy monolith into Spring Boot microservices serving 10,000+ monthly users. " +
                "Integrated Google Maps and MLS feeds, and cut production API latency by 35% through MySQL schema and query tuning."
        );
        realEstate.setGithubUrl("");
        realEstate.setLiveUrl("");
        realEstate.setTags(new String[]{"Java", "Spring Boot", "MySQL", "Google Maps", "React.js"});
        projects.put(realEstate.getId(), realEstate);

        Project logistics = new Project();
        logistics.setId(nextId());
        logistics.setTitle("Logistics Tracking Platform");
        logistics.setDescription(
                "Concurrent shipment tracking system processing 1,000+ daily updates with zero write-collisions. " +
                "Java webhooks reduced processing latency by 30%, with JUnit/Mockito coverage above 80% on critical paths."
        );
        logistics.setGithubUrl("");
        logistics.setLiveUrl("");
        logistics.setTags(new String[]{"Java", "Webhooks", "JUnit", "Mockito", "REST APIs"});
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

