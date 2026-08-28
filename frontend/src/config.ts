export const config = {
    site: {
        url: "https://gauravsahitya.com",
        ogImage: "/images/mypic.jpeg",
        name: "Gaurav Sahitya — Software Engineer Portfolio",
        locale: "en_IN",
        language: "en",
    },
    seo: {
        identity:
            "Gaurav Sahitya is a software engineer (SDE-II) based in Bengaluru, India. He designs and scales Java and Spring Boot distributed systems at KadelLabs.",
        keywords:
            "Gaurav Sahitya, Gaurav Sahitya software engineer, SDE-II Bengaluru, Java developer India, Spring Boot engineer, distributed systems engineer, AWS backend engineer, KadelLabs, microservices developer",
        faqs: [
            {
                question: "Who is Gaurav Sahitya?",
                answer:
                    "Gaurav Sahitya is a software engineer (SDE-II) based in Bengaluru, India. He specializes in Java, Spring Boot, microservices, and AWS-backed distributed systems, and currently works at KadelLabs.",
            },
            {
                question: "What does Gaurav Sahitya do?",
                answer:
                    "Gaurav Sahitya builds production backend platforms: Java microservices, REST APIs, AWS document pipelines, and AI-assisted automation. His work includes cutting API latency by 35%+ and scaling systems to 10,000+ monthly users.",
            },
            {
                question: "Where does Gaurav Sahitya work?",
                answer:
                    "Gaurav Sahitya is a Software Engineer at KadelLabs in Bengaluru (2025–present). He previously worked at AppCrave (2023–2025) and Fox Digits (2022–2023).",
            },
            {
                question: "What technologies does Gaurav Sahitya use?",
                answer:
                    "Gaurav Sahitya works with Java, Spring Boot, microservices, REST APIs, AWS (Textract, Lambda, S3), MySQL, React, OpenAI, Hibernate, Spring Security, JUnit, and Mockito.",
            },
            {
                question: "How can I contact Gaurav Sahitya?",
                answer:
                    "Email gauravsahitya62@gmail.com, connect on LinkedIn at linkedin.com/in/gaurav-sahitya/, or visit https://gauravsahitya.com/.",
            },
        ],
    },
    developer: {
        name: "Gaurav",
        fullName: "Gaurav Sahitya",
        initials: "GS",
        title: "SDE-II — Distributed Systems & Java",
        primaryRole: "SDE-II",
        secondaryRole: "Distributed Systems Engineer",
        description: "SDE-II with 4+ years designing distributed Java and Spring Boot systems. REST API latency optimization, AWS integrations, and AI-assisted engineering that drive 35%+ performance gains."
    },
    social: {
        github: "gauravsahitya62",
        email: "gauravsahitya62@gmail.com",
        location: "Bengaluru, Karnataka, India"
    },
    about: {
        title: "About Me",
        description: "Senior Engineer with 4+ years of experience designing and scaling distributed backend systems using Java, Spring Boot, and Microservices. I specialize in REST API latency optimization, AWS cloud integrations, and AI-assisted engineering workflows that drive 35%+ system performance gains. I architect production platforms end to end — AI automation engines processing thousands of requests a month, document-ingestion pipelines with zero data loss, and microservices that scale to 10,000+ monthly users. Reliability, latency, and maintainability matter more to me than quick hacks."
    },
    experiences: [
        {
            position: "Software Engineer",
            company: "KadelLabs",
            period: "2025 - Present",
            location: "Bengaluru, India",
            description: "Architected a Spring Boot automation engine processing 5,000+ requests/month, cutting manual support overhead by 60%. Integrated OpenAI and AWS Textract for invoice ingestion with zero data loss.",
            responsibilities: [
                "Architected a Spring Boot automation engine processing 5,000+ requests/month, cutting manual support overhead by 60%.",
                "Integrated OpenAI and AWS Textract to engineer automated document ingestion for 1,000+ invoices/month with zero data loss.",
                "Implemented administrative filtering modules via Spring AOP, expanding backend structural data-retrieval speeds by 30%.",
                "Used Cursor and Amazon Q to accelerate core business-logic prototyping and automate unit-test validation layers."
            ],
            technologies: ["Java", "Spring Boot", "AWS Textract", "OpenAI", "Spring AOP"]
        },
        {
            position: "MCA",
            company: "Pratap University, Jaipur",
            period: "2024",
            location: "Jaipur, India",
            description: "Postgraduate focus on software engineering, distributed systems, and applied computing while shipping production Java systems.",
            responsibilities: [
                "Software engineering and distributed systems coursework",
                "Applied computing and backend system design"
            ],
            technologies: ["Java", "Databases", "System Design"]
        },
        {
            position: "Software Engineer",
            company: "AppCrave",
            period: "2023 - 2025",
            location: "Udaipur, India",
            description: "Refactored a legacy monolith into Spring Boot microservices serving 10,000+ monthly users. Cut production API latency by 35% through MySQL schema and query tuning.",
            responsibilities: [
                "Refactored a legacy monolithic platform into decoupled Spring Boot microservices, scaling infrastructure to 10,000+ active monthly users.",
                "Diagnosed MySQL bottlenecks by tuning schemas and queries, cutting downstream production API response latencies by 35%.",
                "Engineered secure, data-heavy integrations for Google Maps and MLS Feed APIs alongside React.js UI modules."
            ],
            technologies: ["Java", "Spring Boot", "MySQL", "React.js", "Google Maps"]
        },
        {
            position: "Software Engineer",
            company: "Fox Digits",
            period: "2022 - 2023",
            location: "Udaipur, India",
            description: "Earned a full-time SDE conversion after a high-impact internship. Built concurrent shipment tracking processing 1,000+ daily updates with zero write-collisions.",
            responsibilities: [
                "Earned a full-time SDE conversion after a high-impact 6-month internship, taking technical ownership of critical logistics modules.",
                "Built a concurrent tracking platform processing 1,000+ daily shipment updates with zero write-collisions.",
                "Authored mock testing suites with JUnit and Mockito, driving automated test coverage past an 80% baseline."
            ],
            technologies: ["Java", "Webhooks", "JUnit", "Mockito", "REST APIs"]
        }
    ],
    projects: [
        {
            id: 1,
            title: "Wedding Vows by Nikhil",
            category: "Web / WordPress",
            technologies: "WordPress, Elementor, PHP, JavaScript, CSS",
            image: "/images/placeholder.webp",
            icon: "heart",
            description: "Destination wedding planning site for an Udaipur studio — venue stories, galleries, and consultation booking for couples planning palace and lakeside celebrations across India.",
            link: "https://weddingvowsbynikhil.com"
        },
        {
            id: 2,
            title: "AI Systems Automation Platform",
            category: "Backend / AI",
            technologies: "Java, Spring Boot, Spring AOP, OpenAI, REST APIs",
            image: "/images/placeholder.webp",
            icon: "robot",
            description: "Spring Boot automation engine processing 5,000+ requests/month with intelligent routing, cutting manual support overhead by 60%.",
            link: "https://github.com/gauravsahitya62"
        },
        {
            id: 3,
            title: "Invoice Ingestion Pipeline",
            category: "AWS / AI",
            technologies: "AWS Textract, OpenAI, Lambda, S3, Spring Boot",
            image: "/images/placeholder.webp",
            icon: "invoice",
            description: "Asynchronous document pipeline ingesting 1,000+ invoices/month with zero data loss — extraction, validation, and downstream processing.",
            link: "https://github.com/gauravsahitya62"
        },
        {
            id: 4,
            title: "Real Estate Microservices",
            category: "Distributed Systems",
            technologies: "Java, Spring Boot, MySQL, Google Maps, React.js",
            image: "/images/placeholder.webp",
            icon: "building",
            description: "Refactored a legacy monolith into Spring Boot microservices serving 10,000+ monthly users and cut API latency by 35%.",
            link: "https://github.com/gauravsahitya62"
        },
        {
            id: 5,
            title: "Logistics Tracking Platform",
            category: "Backend / Java",
            technologies: "Java, Webhooks, JUnit, Mockito, REST APIs",
            image: "/images/placeholder.webp",
            icon: "truck",
            description: "Concurrent shipment tracking processing 1,000+ daily updates with zero write-collisions and 80%+ test coverage on critical paths.",
            link: "https://github.com/gauravsahitya62"
        },
        {
            id: 6,
            title: "Play With Me",
            category: "Interactive",
            technologies: "React, TypeScript, Chess Engine",
            image: "/images/placeholder.webp",
            icon: "chess",
            description: "An interactive chess board and chat built into this portfolio — the same play experience as the original 3D template.",
            link: "/play"
        }
    ],
    contact: {
        email: "gauravsahitya62@gmail.com",
        phone: "+91 63771 89746",
        github: "https://github.com/gauravsahitya62",
        linkedin: "https://linkedin.com/in/gaurav-sahitya/",
        twitter: "",
        facebook: "",
        instagram: ""
    },
    resume: "/Gaurav_Sahitya.pdf",
    skills: {
        develop: {
            title: "BACKEND ENGINEER",
            description: "Java microservices & production APIs",
            details: "Designing and scaling Java microservices, REST APIs, and production systems that hold up under load.",
            tools: ["Java", "Spring Boot", "Microservices", "REST APIs", "MySQL", "JUnit", "Mockito", "Hibernate", "Spring Security"]
        },
        design: {
            title: "DISTRIBUTED SYSTEMS",
            description: "AWS, latency, and scale",
            details: "AWS integrations, async pipelines, and latency work that cut API response times by 35%+ in production.",
            tools: ["AWS", "Textract", "Lambda", "S3", "Docker", "CI/CD", "React.js", "MongoDB", "System Design"]
        }
    }
};
