package com.portfolio.controller;

import com.portfolio.model.About;
import com.portfolio.model.Project;
import com.portfolio.model.SocialLink;
import com.portfolio.service.PortfolioService;
import com.portfolio.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api")
public class PortfolioController {

    private final PortfolioService service;
    private final AuthService authService;

    public PortfolioController(PortfolioService service, AuthService authService) {
        this.service = service;
        this.authService = authService;
    }

    // About

    @GetMapping("/about")
    public About getAbout() {
        return service.getAbout();
    }

    @PutMapping("/about")
    public ResponseEntity<About> updateAbout(
            @RequestHeader(value = "X-ADMIN-TOKEN", required = false) String token,
            @Valid @RequestBody About about) {
        if (!authService.isValidToken(token)) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(service.updateAbout(about));
    }

    @PostMapping(value = "/about/photo", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<About> uploadAboutPhoto(
            @RequestHeader(value = "X-ADMIN-TOKEN", required = false) String token,
            @RequestParam("file") MultipartFile file) {
        if (!authService.isValidToken(token)) {
            return ResponseEntity.status(401).build();
        }
        try {
            return ResponseEntity.ok(service.saveAboutPhoto(file));
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/about/photo")
    public ResponseEntity<Resource> getAboutPhoto() {
        try {
            Resource resource = service.getAboutPhotoResource();
            if (resource == null || !resource.exists()) {
                return ResponseEntity.notFound().build();
            }
            String contentType = "image/jpeg";
            String filename = resource.getFilename();
            if (filename != null) {
                if (filename.endsWith(".png")) contentType = "image/png";
                else if (filename.endsWith(".gif")) contentType = "image/gif";
                else if (filename.endsWith(".webp")) contentType = "image/webp";
            }
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CACHE_CONTROL, "max-age=60")
                    .body(resource);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    // Projects

    @GetMapping("/projects")
    public List<Project> listProjects() {
        return service.listProjects();
    }

    @PostMapping("/projects")
    public ResponseEntity<Project> createProject(
            @RequestHeader(value = "X-ADMIN-TOKEN", required = false) String token,
            @Valid @RequestBody Project project) {
        if (!authService.isValidToken(token)) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(service.createProject(project));
    }

    @PutMapping("/projects/{id}")
    public ResponseEntity<Project> updateProject(
            @RequestHeader(value = "X-ADMIN-TOKEN", required = false) String token,
            @PathVariable String id,
            @Valid @RequestBody Project project) {
        if (!authService.isValidToken(token)) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(service.updateProject(id, project));
    }

    @DeleteMapping("/projects/{id}")
    public ResponseEntity<Void> deleteProject(
            @RequestHeader(value = "X-ADMIN-TOKEN", required = false) String token,
            @PathVariable String id) {
        if (!authService.isValidToken(token)) {
            return ResponseEntity.status(401).build();
        }
        service.deleteProject(id);
        return ResponseEntity.noContent().build();
    }

    // Social links

    @GetMapping("/links")
    public List<SocialLink> listLinks() {
        return service.listLinks();
    }

    @PostMapping("/links")
    public ResponseEntity<SocialLink> createLink(
            @RequestHeader(value = "X-ADMIN-TOKEN", required = false) String token,
            @Valid @RequestBody SocialLink link) {
        if (!authService.isValidToken(token)) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(service.createLink(link));
    }

    @PutMapping("/links/{id}")
    public ResponseEntity<SocialLink> updateLink(
            @RequestHeader(value = "X-ADMIN-TOKEN", required = false) String token,
            @PathVariable String id,
            @Valid @RequestBody SocialLink link) {
        if (!authService.isValidToken(token)) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(service.updateLink(id, link));
    }

    @DeleteMapping("/links/{id}")
    public ResponseEntity<Void> deleteLink(
            @RequestHeader(value = "X-ADMIN-TOKEN", required = false) String token,
            @PathVariable String id) {
        if (!authService.isValidToken(token)) {
            return ResponseEntity.status(401).build();
        }
        service.deleteLink(id);
        return ResponseEntity.noContent().build();
    }
}

