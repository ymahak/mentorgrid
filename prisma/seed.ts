import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting seed...");

  // Create admin user
  const adminPassword = process.env.ADMIN_PASSWORD || "MahakYadav@2024";
  const hashedPassword = await bcrypt.hash(adminPassword, 12);

  // Delete existing admin and create new one
  await prisma.adminUser.deleteMany();
  await prisma.adminUser.create({
    data: {
      email: "admin@mahakyadav.com",
      name: "Admin",
      passwordHash: hashedPassword,
    },
  });
  console.log("Admin user created");

  // Create mentor profile
  await prisma.mentorProfile.deleteMany();
  await prisma.mentorProfile.create({
    data: {
      name: "Mahak Yadav",
      designation: "Program Head | Technical Trainer | Full-Stack Developer",
      bio: `I'm a passionate educator and developer who believes in learning by doing. I help aspiring developers become industry-ready through hands-on training in AI/ML, Data Science, and Full-Stack Development.

I'm a Program Head & Mentor who loves turning complex concepts into simple, understandable lessons. There's nothing more rewarding than seeing a student's "aha!" moment.

With experience in both teaching and building real products, I bring practical, industry-relevant knowledge to every session. Beyond training, I work as a Full-Time Software Developer, applying my technical expertise to build real-world B2C and B2B products for both Android and iOS platforms.

I've had the privilege of training 400+ students, helping them transition from learners to confident, job-ready developers. This dual role gives me unique insights into industry requirements, which I bring back to my training programs.

Let's build something amazing together.`,
      skills: JSON.stringify([
        "Python",
        "JavaScript",
        "TypeScript",
        "React.js",
        "Next.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "HTML5/CSS3",
        "Tailwind CSS",
        "SQL",
        "C/C++",
        "ChatGPT",
        "Claude",
        "Gemini",
        "GitHub Copilot",
        "Cursor",
        "VS Code",
        "Git/GitHub",
        "Docker",
        "Firebase",
        "Power BI",
        "Figma"
      ]),
      experience: JSON.stringify([
        {
          title: "Program Head & AI/ML, Data Science, Full-Stack Trainer",
          company: "Orvionar",
          period: "Sept 2025 - April 2026",
          type: "Full-time",
          location: "India",
          description: [
            "Trained 400+ final year B.Tech students in AI/ML, Data Science, and Full-Stack Development",
            "Mentored learners and delivered live training sessions, workshops, and hands-on programs",
            "Owned end-to-end program execution including session planning, scheduling, and real-time issue resolution",
            "Led learner experience and stakeholder coordination as primary point of contact"
          ],
          isCurrent: false
        },
        {
          title: "Full-Time Software Developer",
          company: "Product-Based Company",
          period: "Current",
          type: "Full-time",
          location: "India",
          description: [
            "Building B2C and B2B products",
            "Implementing features for Android and iOS applications",
            "Working on scalable cloud-native applications using React.js and Node.js"
          ],
          isCurrent: true
        },
        {
          title: "MERN Stack Course Creator",
          company: "SkillsTango",
          period: "2025",
          type: "Contract",
          location: "Remote",
          description: [
            "Created and recorded complete MERN Stack course with comprehensive curriculum",
            "Developed capstone project for hands-on learning experience",
            "Designed structured learning modules from basics to advanced concepts"
          ]
        },
        {
          title: "AI/ML Trainer",
          company: "Infranex Technologies",
          period: "2025",
          type: "Contract",
          location: "India",
          description: [
            "Delivered specialized AI/ML training programs",
            "Conducted hands-on workshops on machine learning concepts",
            "Mentored students on practical AI implementations"
          ]
        },
        {
          title: "AI & Computer Science Mentor",
          company: "GrittyTech",
          period: "Ongoing",
          type: "Mentorship",
          location: "Dubai (Remote)",
          description: [
            "Providing one-on-one mentorship for Dubai-based student",
            "Guiding through AI and Computer Science coursework",
            "Offering personalized learning support and career guidance"
          ]
        },
        {
          title: "Technical Course Creator",
          company: "Freelance",
          period: "Ongoing",
          type: "Freelance",
          location: "Remote",
          description: [
            "Created hands-on practical courses for Agentic AI",
            "Developed Business AI training materials",
            "Built Full-Stack and Next.js comprehensive courses",
            "Designed Power BI training programs"
          ]
        }
      ]),
      education: JSON.stringify([
        {
          degree: "B.Tech in Computer Science and Engineering",
          institution: "Lovely Professional University, Jalandhar",
          period: "2021 - 2025"
        }
      ]),
      certifications: JSON.stringify([
        "Full-Stack Trainer - Orvionar (2026)",
        "Developing Front-End Apps with React - IBM (2025)",
        "MERN Stack - Cipher Schools (2024)",
        "DSA - GeeksforGeeks (2023)"
      ]),
      trainingPrograms: JSON.stringify([
        "MERN Stack Development",
        "Agentic AI",
        "Business AI",
        "Full-Stack Development",
        "Next.js Mastery",
        "Power BI Analytics",
        "AI for HR Professionals",
        "Claude for Project Managers",
        "Claude Mastery",
        "AI for Scrum Masters",
        "AI for Software Testing"
      ]),
      linkedinUrl: "https://www.linkedin.com/in/mahak-42675a39b/",
      githubUrl: "https://github.com/ymahak",
    },
  });
  console.log("Mentor profile created");

  // Create site settings
  await prisma.siteSettings.deleteMany();
  const settings = [
    { key: "contactEmail", value: "ymahaky@gmail.com" },
    { key: "phone", value: "+91 9817748915" },
    { key: "linkedinUrl", value: "https://www.linkedin.com/in/mahak-42675a39b/" },
    { key: "githubUrl", value: "https://github.com/ymahak" },
    { key: "location", value: "India" },
  ];

  for (const setting of settings) {
    await prisma.siteSettings.create({
      data: setting,
    });
  }
  console.log("Site settings created");

  // Delete existing courses and modules
  await prisma.module.deleteMany();
  await prisma.course.deleteMany();

  // Course 1: Full Stack Web Development
  const fullstack = await prisma.course.create({
    data: {
      slug: "full-stack-web-development",
      title: "Full Stack Web Development",
      description: "Master modern web development from frontend to backend. Build complete, production-ready web applications using React, Node.js, Express, and MongoDB.",
      technologies: JSON.stringify(["HTML", "CSS", "JavaScript", "React", "Node.js", "Express.js", "MongoDB", "Git", "REST APIs"]),
      level: "Beginner to Advanced",
      duration: "10-12 weeks",
      overview: `This comprehensive Full Stack Web Development course takes you from the fundamentals of web development to building complete, production-ready applications.

You'll start with HTML, CSS, and JavaScript basics, then progress to advanced frontend development with React.js. On the backend, you'll master Node.js and Express.js, learning to build robust REST APIs and work with MongoDB databases.

The course emphasizes practical, project-based learning. You'll build multiple real-world projects throughout the course, culminating in a full-stack capstone project that you can showcase in your portfolio.`,
      prerequisites: "Basic computer literacy. No prior programming experience required for beginners.",
      whoShouldEnroll: "College students looking to start their web development journey, fresh graduates wanting to build job-ready skills, working professionals looking to transition into web development, and anyone interested in building modern web applications.",
      learningOutcomes: JSON.stringify([
        "Build responsive, modern websites using HTML5, CSS3, and JavaScript",
        "Create dynamic user interfaces with React.js and state management",
        "Develop RESTful APIs using Node.js and Express.js",
        "Work with MongoDB for database design and operations",
        "Implement user authentication and authorization",
        "Deploy full-stack applications to cloud platforms",
        "Use Git and GitHub for version control and collaboration",
        "Follow industry best practices for code quality and project structure"
      ]),
      isVisible: true,
      order: 1,
    },
  });

  // Full Stack modules
  const fullstackModules = [
    { title: "HTML, CSS and Responsive Design", description: "Build the foundation of web development", topics: JSON.stringify(["HTML5 semantic elements", "CSS3 styling and layouts", "Flexbox and CSS Grid", "Responsive design principles", "Media queries", "CSS animations and transitions"]), order: 1 },
    { title: "JavaScript Fundamentals", description: "Master the language of the web", topics: JSON.stringify(["Variables, data types, and operators", "Control flow and loops", "Functions and scope", "Arrays and objects", "DOM manipulation", "Event handling"]), order: 2 },
    { title: "Advanced JavaScript and ES6+", description: "Modern JavaScript features and patterns", topics: JSON.stringify(["Arrow functions and template literals", "Destructuring and spread operators", "Promises and async/await", "Modules and imports", "Classes and inheritance", "Error handling"]), order: 3 },
    { title: "React.js Fundamentals", description: "Build dynamic user interfaces", topics: JSON.stringify(["React components and JSX", "Props and state management", "Component lifecycle", "Hooks (useState, useEffect)", "Conditional rendering", "Lists and keys"]), order: 4 },
    { title: "State Management and API Integration", description: "Manage complex application state", topics: JSON.stringify(["Context API", "useReducer hook", "Fetching data from APIs", "Axios and fetch", "Loading and error states", "Custom hooks"]), order: 5 },
    { title: "Node.js and Express.js", description: "Server-side JavaScript development", topics: JSON.stringify(["Node.js fundamentals", "NPM and package management", "Express.js setup and routing", "Middleware concepts", "Request and response handling", "Environment variables"]), order: 6 },
    { title: "MongoDB and Database Design", description: "Work with NoSQL databases", topics: JSON.stringify(["MongoDB fundamentals", "Mongoose ODM", "Schema design and validation", "CRUD operations", "Data relationships", "Indexing and optimization"]), order: 7 },
    { title: "Authentication and Authorization", description: "Secure your applications", topics: JSON.stringify(["JWT authentication", "Password hashing with bcrypt", "Protected routes", "Role-based access control", "Session management", "OAuth basics"]), order: 8 },
    { title: "Git and GitHub", description: "Version control and collaboration", topics: JSON.stringify(["Git fundamentals", "Branching and merging", "Pull requests", "Collaboration workflows", "Resolving conflicts", "GitHub best practices"]), order: 9 },
    { title: "Deployment and Capstone Project", description: "Deploy your application and build a portfolio project", topics: JSON.stringify(["Deployment options overview", "Environment configuration", "CI/CD basics", "Performance optimization", "Capstone project development", "Portfolio presentation"]), order: 10 },
  ];

  for (const mod of fullstackModules) {
    await prisma.module.create({ data: { ...mod, courseId: fullstack.id } });
  }
  console.log("Full Stack course created");

  // Course 2: Data Science & Analytics
  const datascience = await prisma.course.create({
    data: {
      slug: "data-science-analytics",
      title: "Data Science & Analytics",
      description: "Learn to analyze data, build predictive models, and derive actionable insights using Python, SQL, and machine learning techniques.",
      technologies: JSON.stringify(["Python", "NumPy", "Pandas", "SQL", "Statistics", "Power BI", "Machine Learning", "Scikit-learn"]),
      level: "Beginner to Intermediate",
      duration: "10-12 weeks",
      overview: `This Data Science & Analytics course provides a comprehensive foundation in data analysis, statistical methods, and machine learning.

Starting with Python programming and essential libraries like NumPy and Pandas, you'll learn to manipulate and analyze datasets effectively. The course covers SQL for database querying, statistical analysis for data-driven decision making, and visualization techniques using Power BI.

You'll also get introduced to machine learning concepts, building predictive models that can solve real business problems. Throughout the course, you'll work on practical projects using real-world datasets.`,
      prerequisites: "Basic mathematics and logical thinking. No prior programming experience required.",
      whoShouldEnroll: "Aspiring data analysts and data scientists, business professionals wanting to become data-driven, students interested in analytics careers, and professionals looking to add data skills to their profile.",
      learningOutcomes: JSON.stringify([
        "Write Python code for data manipulation and analysis",
        "Use NumPy and Pandas for efficient data processing",
        "Query databases using SQL",
        "Apply statistical methods for data analysis",
        "Create interactive dashboards with Power BI",
        "Build and evaluate machine learning models",
        "Clean and preprocess real-world datasets",
        "Present data insights effectively"
      ]),
      isVisible: true,
      order: 2,
    },
  });

  const datascienceModules = [
    { title: "Python Programming Fundamentals", description: "Build your programming foundation", topics: JSON.stringify(["Python basics and syntax", "Data types and structures", "Control flow and functions", "File handling", "Error handling", "Python best practices"]), order: 1 },
    { title: "NumPy for Numerical Computing", description: "Efficient numerical operations", topics: JSON.stringify(["NumPy arrays", "Array operations and broadcasting", "Mathematical functions", "Linear algebra basics", "Random number generation", "Performance optimization"]), order: 2 },
    { title: "Pandas for Data Analysis", description: "Data manipulation and analysis", topics: JSON.stringify(["DataFrames and Series", "Data loading and export", "Data cleaning and preprocessing", "Filtering and selection", "Grouping and aggregation", "Merging and joining datasets"]), order: 3 },
    { title: "SQL for Data Querying", description: "Database querying essentials", topics: JSON.stringify(["SQL fundamentals", "SELECT queries and filtering", "JOINs and relationships", "Aggregation functions", "Subqueries", "Database design basics"]), order: 4 },
    { title: "Statistics for Data Science", description: "Statistical foundations", topics: JSON.stringify(["Descriptive statistics", "Probability distributions", "Hypothesis testing", "Correlation and regression", "Statistical significance", "A/B testing concepts"]), order: 5 },
    { title: "Data Visualization", description: "Communicate insights visually", topics: JSON.stringify(["Matplotlib fundamentals", "Seaborn for statistical plots", "Choosing the right visualization", "Dashboard design principles", "Storytelling with data", "Interactive visualizations"]), order: 6 },
    { title: "Power BI for Business Intelligence", description: "Create interactive dashboards", topics: JSON.stringify(["Power BI interface and workflow", "Data import and transformation", "Creating visualizations", "DAX formulas basics", "Building dashboards", "Sharing and publishing"]), order: 7 },
    { title: "Introduction to Machine Learning", description: "Predictive modeling fundamentals", topics: JSON.stringify(["ML concepts and types", "Supervised vs unsupervised learning", "Train-test split and validation", "Model evaluation metrics", "Overfitting and underfitting", "Feature engineering basics"]), order: 8 },
    { title: "Machine Learning with Scikit-learn", description: "Build ML models", topics: JSON.stringify(["Linear and logistic regression", "Decision trees and random forests", "Clustering algorithms", "Model selection and tuning", "Cross-validation", "Pipeline creation"]), order: 9 },
    { title: "Capstone Project", description: "End-to-end data science project", topics: JSON.stringify(["Problem definition", "Data collection and cleaning", "Exploratory data analysis", "Model building and evaluation", "Results presentation", "Portfolio documentation"]), order: 10 },
  ];

  for (const mod of datascienceModules) {
    await prisma.module.create({ data: { ...mod, courseId: datascience.id } });
  }
  console.log("Data Science course created");

  // Course 3: AI & Machine Learning
  const aiml = await prisma.course.create({
    data: {
      slug: "artificial-intelligence-machine-learning",
      title: "Artificial Intelligence & Machine Learning",
      description: "Dive deep into AI and ML, from classical algorithms to deep learning and generative AI. Build intelligent systems that can learn and adapt.",
      technologies: JSON.stringify(["Python", "Scikit-learn", "TensorFlow", "Deep Learning", "Neural Networks", "Generative AI", "LLMs"]),
      level: "Beginner to Advanced",
      duration: "12 weeks",
      overview: `This comprehensive AI & Machine Learning course takes you from fundamental concepts to advanced deep learning and generative AI.

You'll start with Python programming and mathematical foundations, then progress through classical machine learning algorithms, neural networks, and deep learning architectures. The course covers the latest developments in generative AI and large language models.

Emphasis is placed on practical implementation, with hands-on projects that demonstrate real-world AI applications.`,
      prerequisites: "Basic Python programming knowledge recommended. Familiarity with basic mathematics (algebra, statistics) helpful.",
      whoShouldEnroll: "Developers wanting to add AI/ML skills, data professionals looking to advance into ML, students interested in AI careers, and anyone fascinated by intelligent systems.",
      learningOutcomes: JSON.stringify([
        "Understand core AI and ML concepts and terminology",
        "Implement classical ML algorithms from scratch",
        "Build and train neural networks using TensorFlow",
        "Apply deep learning to computer vision and NLP tasks",
        "Work with pre-trained models and transfer learning",
        "Understand and use generative AI and LLMs",
        "Deploy ML models to production",
        "Stay current with AI developments and best practices"
      ]),
      isVisible: true,
      order: 3,
    },
  });

  const aimlModules = [
    { title: "Python for AI/ML", description: "Programming foundation for AI", topics: JSON.stringify(["Python refresher", "NumPy and Pandas", "Matplotlib and visualization", "Jupyter notebooks", "Virtual environments", "Best practices"]), order: 1 },
    { title: "Mathematics for Machine Learning", description: "Mathematical foundations", topics: JSON.stringify(["Linear algebra essentials", "Calculus basics", "Probability and statistics", "Optimization concepts", "Mathematical notation", "Practical applications"]), order: 2 },
    { title: "Introduction to Machine Learning", description: "Core ML concepts", topics: JSON.stringify(["ML paradigms", "Supervised learning", "Unsupervised learning", "Model evaluation", "Bias-variance tradeoff", "Feature engineering"]), order: 3 },
    { title: "Classical ML Algorithms", description: "Traditional ML methods", topics: JSON.stringify(["Linear regression", "Logistic regression", "Decision trees", "Random forests", "SVM", "K-means clustering"]), order: 4 },
    { title: "Neural Networks Fundamentals", description: "Deep learning basics", topics: JSON.stringify(["Perceptrons", "Activation functions", "Backpropagation", "Gradient descent", "Loss functions", "Regularization"]), order: 5 },
    { title: "Deep Learning with TensorFlow", description: "Building neural networks", topics: JSON.stringify(["TensorFlow basics", "Keras API", "Building neural networks", "Training and validation", "Callbacks and checkpoints", "Model saving and loading"]), order: 6 },
    { title: "Convolutional Neural Networks", description: "Computer vision with CNNs", topics: JSON.stringify(["CNN architecture", "Convolution operations", "Pooling layers", "Image classification", "Transfer learning", "Popular architectures"]), order: 7 },
    { title: "Natural Language Processing", description: "Text and language AI", topics: JSON.stringify(["Text preprocessing", "Word embeddings", "RNNs and LSTMs", "Attention mechanism", "Transformers intro", "Sentiment analysis"]), order: 8 },
    { title: "Generative AI and LLMs", description: "Modern AI systems", topics: JSON.stringify(["Generative models overview", "GPT architecture", "Prompt engineering", "Fine-tuning concepts", "API integration", "Ethical considerations"]), order: 9 },
    { title: "Capstone Project", description: "End-to-end AI project", topics: JSON.stringify(["Project planning", "Data collection", "Model development", "Training and optimization", "Deployment", "Documentation"]), order: 10 },
  ];

  for (const mod of aimlModules) {
    await prisma.module.create({ data: { ...mod, courseId: aiml.id } });
  }
  console.log("AI/ML course created");

  // Course 4: Python Programming
  const python = await prisma.course.create({
    data: {
      slug: "python-programming",
      title: "Python Programming",
      description: "Master Python from basics to advanced concepts. Learn to build applications, automate tasks, and work with APIs and data structures.",
      technologies: JSON.stringify(["Python", "OOP", "Data Structures", "APIs", "Automation", "File Handling", "Testing"]),
      level: "Beginner to Intermediate",
      duration: "8-10 weeks",
      overview: `This Python Programming course provides a solid foundation in one of the most versatile and in-demand programming languages.

Starting from the basics, you'll learn Python syntax, data types, and control structures. The course progresses to object-oriented programming, working with files and APIs, and building practical applications.

You'll also learn automation techniques, testing practices, and how to structure larger Python projects professionally.`,
      prerequisites: "No prior programming experience required. Basic computer literacy needed.",
      whoShouldEnroll: "Complete beginners to programming, professionals wanting to learn Python for automation, students preparing for data science or web development, and anyone interested in a versatile programming language.",
      learningOutcomes: JSON.stringify([
        "Write clean, efficient Python code",
        "Understand and apply object-oriented programming",
        "Work with files, APIs, and external data",
        "Build practical automation scripts",
        "Implement common data structures and algorithms",
        "Write tests for Python code",
        "Structure and organize Python projects",
        "Debug and troubleshoot Python applications"
      ]),
      isVisible: true,
      order: 4,
    },
  });

  const pythonModules = [
    { title: "Python Basics", description: "Getting started with Python", topics: JSON.stringify(["Installation and setup", "Variables and data types", "Operators", "Input/output", "Comments and documentation", "Code style"]), order: 1 },
    { title: "Control Flow", description: "Program logic and flow", topics: JSON.stringify(["Conditional statements", "Loops (for, while)", "Break and continue", "Loop patterns", "Nested structures", "Error handling basics"]), order: 2 },
    { title: "Functions", description: "Modular programming", topics: JSON.stringify(["Defining functions", "Parameters and arguments", "Return values", "Scope and namespaces", "Lambda functions", "Decorators intro"]), order: 3 },
    { title: "Data Structures", description: "Organizing data", topics: JSON.stringify(["Lists and tuples", "Dictionaries", "Sets", "List comprehensions", "Dictionary comprehensions", "Choosing the right structure"]), order: 4 },
    { title: "Object-Oriented Programming", description: "OOP concepts", topics: JSON.stringify(["Classes and objects", "Attributes and methods", "Inheritance", "Polymorphism", "Encapsulation", "Magic methods"]), order: 5 },
    { title: "File Handling", description: "Working with files", topics: JSON.stringify(["Reading files", "Writing files", "CSV and JSON", "Context managers", "File paths", "Error handling"]), order: 6 },
    { title: "Working with APIs", description: "External data integration", topics: JSON.stringify(["HTTP basics", "Requests library", "JSON handling", "API authentication", "Rate limiting", "Building API clients"]), order: 7 },
    { title: "Automation and Scripting", description: "Practical automation", topics: JSON.stringify(["OS module", "Subprocess", "Scheduling tasks", "Web scraping basics", "Email automation", "Practical scripts"]), order: 8 },
    { title: "Testing and Debugging", description: "Code quality", topics: JSON.stringify(["Print debugging", "Using debuggers", "Unit testing", "pytest basics", "Test-driven development", "Code coverage"]), order: 9 },
    { title: "Project Development", description: "Building real projects", topics: JSON.stringify(["Project structure", "Virtual environments", "Requirements management", "Documentation", "Version control", "Final project"]), order: 10 },
  ];

  for (const mod of pythonModules) {
    await prisma.module.create({ data: { ...mod, courseId: python.id } });
  }
  console.log("Python course created");

  // Course 5: Data Analytics & BI
  const dataanalytics = await prisma.course.create({
    data: {
      slug: "data-analytics-business-intelligence",
      title: "Data Analytics & Business Intelligence",
      description: "Learn to transform raw data into actionable business insights using Excel, SQL, Power BI, Tableau, and Python visualization tools.",
      technologies: JSON.stringify(["Advanced Excel", "SQL", "Power BI", "Tableau", "Python", "Data Visualization"]),
      level: "Beginner to Advanced",
      duration: "10-12 weeks",
      overview: `This Data Analytics & Business Intelligence course equips you with the skills to analyze data and create compelling visualizations that drive business decisions.

You'll master advanced Excel techniques, SQL for data querying, and industry-leading BI tools like Power BI and Tableau. The course also covers Python for data visualization, giving you a complete analytics toolkit.

Real-world case studies and projects ensure you can apply these skills in actual business scenarios.`,
      prerequisites: "Basic computer skills and familiarity with spreadsheets. No programming experience required.",
      whoShouldEnroll: "Business analysts and aspiring analysts, professionals working with data, managers wanting data-driven insights, and anyone interested in business intelligence careers.",
      learningOutcomes: JSON.stringify([
        "Perform advanced data analysis in Excel",
        "Write complex SQL queries for data extraction",
        "Build interactive dashboards in Power BI",
        "Create visualizations in Tableau",
        "Use Python for data visualization",
        "Apply statistical analysis to business problems",
        "Present data insights to stakeholders",
        "Design effective data visualizations"
      ]),
      isVisible: true,
      order: 5,
    },
  });

  const dataanalyticsModules = [
    { title: "Advanced Excel", description: "Excel power user skills", topics: JSON.stringify(["Advanced formulas", "Pivot tables", "Data validation", "Conditional formatting", "VLOOKUP/XLOOKUP", "Power Query intro"]), order: 1 },
    { title: "SQL Fundamentals", description: "Database querying basics", topics: JSON.stringify(["Database concepts", "SELECT statements", "Filtering and sorting", "Aggregations", "JOINs", "Subqueries"]), order: 2 },
    { title: "Advanced SQL", description: "Complex data queries", topics: JSON.stringify(["Window functions", "CTEs", "Complex queries", "Performance optimization", "Stored procedures intro", "Real-world queries"]), order: 3 },
    { title: "Data Visualization Principles", description: "Effective visual communication", topics: JSON.stringify(["Visualization types", "Choosing charts", "Color theory", "Dashboard design", "Storytelling with data", "Common mistakes"]), order: 4 },
    { title: "Power BI Fundamentals", description: "Getting started with Power BI", topics: JSON.stringify(["Power BI Desktop", "Data connections", "Data modeling", "Basic visualizations", "Filters and slicers", "Publishing reports"]), order: 5 },
    { title: "Advanced Power BI", description: "Power BI mastery", topics: JSON.stringify(["DAX formulas", "Calculated columns", "Measures", "Time intelligence", "Row-level security", "Advanced visuals"]), order: 6 },
    { title: "Tableau Fundamentals", description: "Getting started with Tableau", topics: JSON.stringify(["Tableau interface", "Connecting to data", "Building visualizations", "Calculations", "Filters and parameters", "Dashboard creation"]), order: 7 },
    { title: "Advanced Tableau", description: "Tableau mastery", topics: JSON.stringify(["LOD expressions", "Table calculations", "Advanced charts", "Tableau Server basics", "Performance optimization", "Best practices"]), order: 8 },
    { title: "Python for Visualization", description: "Programmatic visualization", topics: JSON.stringify(["Matplotlib basics", "Seaborn", "Plotly interactive charts", "Pandas visualization", "Custom styling", "Exporting visualizations"]), order: 9 },
    { title: "Capstone Project", description: "End-to-end BI project", topics: JSON.stringify(["Business problem definition", "Data gathering", "Analysis and insights", "Dashboard creation", "Presentation", "Portfolio piece"]), order: 10 },
  ];

  for (const mod of dataanalyticsModules) {
    await prisma.module.create({ data: { ...mod, courseId: dataanalytics.id } });
  }
  console.log("Data Analytics course created");

  // Course 6: Generative AI & Prompt Engineering
  const genai = await prisma.course.create({
    data: {
      slug: "generative-ai-prompt-engineering",
      title: "Generative AI & Prompt Engineering",
      description: "Master the art of working with AI tools like ChatGPT, Claude, and Gemini. Learn prompt engineering, AI agents, and workflow automation.",
      technologies: JSON.stringify(["ChatGPT", "Claude", "Gemini", "Prompt Engineering", "AI Agents", "Workflow Automation", "API Integration"]),
      level: "Beginner to Intermediate",
      duration: "8 weeks",
      overview: `This Generative AI & Prompt Engineering course teaches you to effectively leverage AI tools for productivity, creativity, and problem-solving.

You'll learn the principles of prompt engineering, how to get the best results from various AI models, and how to build AI-powered workflows and agents. The course covers practical applications across different domains.

No coding experience is required for most of the course, though optional modules cover API integration for developers.`,
      prerequisites: "No technical background required. Curiosity about AI and willingness to experiment.",
      whoShouldEnroll: "Professionals wanting to boost productivity with AI, content creators and marketers, developers interested in AI integration, and anyone curious about generative AI capabilities.",
      learningOutcomes: JSON.stringify([
        "Understand how large language models work",
        "Write effective prompts for various AI tools",
        "Apply prompt engineering techniques",
        "Build AI-powered workflows",
        "Create and use AI agents",
        "Integrate AI into daily work",
        "Understand AI limitations and ethics",
        "Stay current with AI developments"
      ]),
      isVisible: true,
      order: 6,
    },
  });

  const genaiModules = [
    { title: "Introduction to Generative AI", description: "Understanding modern AI", topics: JSON.stringify(["What is generative AI", "How LLMs work", "Major AI tools overview", "Capabilities and limitations", "Use cases", "Getting started"]), order: 1 },
    { title: "Prompt Engineering Fundamentals", description: "Core prompting skills", topics: JSON.stringify(["Anatomy of a prompt", "Clear instructions", "Context and examples", "Output formatting", "Iterative refinement", "Common patterns"]), order: 2 },
    { title: "Advanced Prompting Techniques", description: "Expert prompting methods", topics: JSON.stringify(["Chain of thought", "Few-shot learning", "Role prompting", "System prompts", "Temperature and parameters", "Prompt templates"]), order: 3 },
    { title: "Working with ChatGPT", description: "Mastering ChatGPT", topics: JSON.stringify(["ChatGPT interface", "GPT-4 capabilities", "Custom instructions", "Plugins and tools", "Code interpreter", "Best practices"]), order: 4 },
    { title: "Working with Claude", description: "Mastering Claude", topics: JSON.stringify(["Claude interface", "Claude capabilities", "Long context handling", "Artifacts", "Projects feature", "Comparison with GPT"]), order: 5 },
    { title: "Working with Gemini", description: "Mastering Gemini", topics: JSON.stringify(["Gemini interface", "Multimodal capabilities", "Google integration", "Gemini Advanced", "Use cases", "Best practices"]), order: 6 },
    { title: "AI for Productivity", description: "Practical AI applications", topics: JSON.stringify(["Writing assistance", "Research and analysis", "Summarization", "Email and communication", "Learning and education", "Creative tasks"]), order: 7 },
    { title: "AI Agents and Automation", description: "Building AI workflows", topics: JSON.stringify(["What are AI agents", "Agent frameworks", "Building simple agents", "Workflow automation", "Tool use", "Practical applications"]), order: 8 },
    { title: "AI Integration (Optional)", description: "Developer-focused AI integration", topics: JSON.stringify(["API basics", "OpenAI API", "Anthropic API", "Building applications", "Rate limits and costs", "Production considerations"]), order: 9 },
    { title: "Capstone Project", description: "Build your AI solution", topics: JSON.stringify(["Project ideation", "Workflow design", "Implementation", "Testing and refinement", "Documentation", "Presentation"]), order: 10 },
  ];

  for (const mod of genaiModules) {
    await prisma.module.create({ data: { ...mod, courseId: genai.id } });
  }
  console.log("Generative AI course created");

  // Create Aptitude & Logical Reasoning course
  const aptitude = await prisma.course.create({
    data: {
      slug: "aptitude-logical-reasoning",
      title: "Aptitude & Logical Reasoning Mastery",
      description:
        "Master aptitude and logical reasoning for competitive exams like SSC, RRB, IBPS, UPSC, and campus placements. Covers all major topics with proven solving techniques.",
      technologies: JSON.stringify(["Logical Reasoning", "Verbal Reasoning", "Non-Verbal Reasoning", "Quantitative Aptitude", "Data Interpretation"]),
      level: "Beginner to Advanced",
      duration: "8 weeks",
      overview: `This comprehensive Aptitude & Logical Reasoning course prepares you for competitive exams and campus placements.

You'll master all major reasoning topics including Analogy, Blood Relations, Coding-Decoding, Number Series, Letter Series, Seating Arrangements, Calendars, Clocks, Venn Diagrams, Syllogisms, and Pattern Recognition.

The course emphasizes shortcut techniques and tricks that help you solve questions in under 60 seconds. You'll practice with actual exam patterns from SSC, RRB, IBPS, KPSC, and UPSC.`,
      prerequisites: "Basic math knowledge (Class 10 level). No prior aptitude training required.",
      whoShouldEnroll: "Students preparing for competitive exams (SSC, RRB, IBPS, UPSC), college students preparing for campus placements, job seekers appearing for aptitude tests, and anyone wanting to improve logical thinking skills.",
      learningOutcomes: JSON.stringify([
        "Solve reasoning questions in under 60 seconds",
        "Master all major aptitude topics",
        "Crack competitive exam reasoning sections",
        "Build strong logical thinking skills",
        "Improve accuracy and speed",
        "Handle exam pressure with confidence",
      ]),
      isVisible: true,
      order: 7,
    },
  });

  const aptitudeModules = [
    {
      title: "Analogy Reasoning",
      description:
        "Master the two-step method for solving analogy questions. Learn 33+ relationship types including synonyms, antonyms, worker-tool, part-whole, and GK-based analogies.",
      order: 1,
      topics: JSON.stringify([
        "What is Analogy Reasoning",
        "The Two-Step Method (Master Key)",
        "Basic vs Advanced Relations",
        "Letter/Word-based Analogies",
        "Number-based Analogies",
        "Mixed & Image-based Analogies",
        "33 Relationship Types Bank",
        "Worked Examples & Practice",
      ]),
    },
    {
      title: "Blood Relations",
      description:
        "Learn the family-tree method to solve complex blood relation puzzles. Master coded relations, symbol-based questions, and multi-person family problems.",
      order: 2,
      topics: JSON.stringify([
        "Core Relationship Glossary",
        "The Family-Tree Method",
        "Gender Identification Rules",
        "Coded Blood Relations",
        "Symbol-based Questions",
        "Multi-person Puzzles",
        "Common Errors to Avoid",
        "Practice Problems with Solutions",
      ]),
    },
    {
      title: "Directional Sense",
      description:
        "Master all 7 direction question formats including movement tracking, shadow problems, clock directions, and seating arrangements with distance.",
      order: 3,
      topics: JSON.stringify([
        "Cardinal & Intermediate Directions",
        "Right/Left Movement Tracking",
        "Directional Reference Points",
        "Sun Rays & Shadow Problems",
        "Correct vs Wrong Map",
        "Directions in Clocks",
        "Directions in Board Games",
        "Seating Arrangement with Distance",
      ]),
    },
    {
      title: "Coding & Decoding",
      description:
        "Learn pattern-spotting techniques for all coding types. Master alphabet coding, numerical coding, symbol-based coding, and sentence deciphering.",
      order: 4,
      topics: JSON.stringify([
        "Types of Coding Questions",
        "Structure of Code Trick",
        "Symbol-to-Letter Table Building",
        "Alphabet Position Coding",
        "Numerical Coding Patterns",
        "Mixed Coding (Letter + Number + Symbol)",
        "Sentence Deciphering",
        "Practice with Exam Patterns",
      ]),
    },
    {
      title: "Number Series",
      description:
        "Master all number series patterns including arithmetic, geometric, squares, cubes, alternating, and mixed patterns. Learn the differences-row technique.",
      order: 5,
      topics: JSON.stringify([
        "Missing Number vs Wrong Number",
        "Plain Addition/Subtraction Series",
        "Multiplication/Division Series",
        "Squares & Cubes Patterns",
        "The Differences-Row Technique",
        "Alternating Patterns",
        "Mixed Operations",
        "Prime Number Series",
      ]),
    },
    {
      title: "Letter Series",
      description:
        "Learn EJOTY and VQLGB shortcuts for instant letter position recall. Master growing gap patterns, constant gap series, and wraparound rules.",
      order: 6,
      topics: JSON.stringify([
        "Alphabet Position Tables",
        "EJOTY Shortcut (Left to Right)",
        "VQLGB Shortcut (Right to Left)",
        "Constant Gap Patterns",
        "Growing Gap Patterns",
        "Backward Series",
        "Wraparound Rule",
        "Mixed Letter-Number Series",
      ]),
    },
    {
      title: "Seating Arrangements",
      description:
        "Master both linear and circular seating arrangements. Learn systematic approaches for complex multi-person puzzles with multiple conditions.",
      order: 7,
      topics: JSON.stringify([
        "Linear Arrangement Basics",
        "Single Row vs Double Row",
        "Facing Same/Opposite Direction",
        "Circular Arrangement Basics",
        "Clockwise vs Anti-clockwise",
        "Fixed Position Anchoring",
        "Multi-condition Puzzles",
        "Elimination Technique",
      ]),
    },
    {
      title: "Ranking & Order",
      description:
        "Solve ranking problems involving positions from top/bottom, left/right. Master interchange problems and comparison-based ordering.",
      order: 8,
      topics: JSON.stringify([
        "Position from Top/Bottom",
        "Position from Left/Right",
        "Total Count Formula",
        "Interchange Problems",
        "Comparison-based Ranking",
        "Age-based Ordering",
        "Merit List Problems",
        "Practice Drills",
      ]),
    },
    {
      title: "Calendars & Clocks",
      description:
        "Master calendar calculations for any date. Learn clock angle formulas and solve problems involving time, angles, and mirror reflections.",
      order: 9,
      topics: JSON.stringify([
        "Odd Days Concept",
        "Day of Any Date Calculation",
        "Leap Year Rules",
        "Clock Angle Formula",
        "Angle at Any Time",
        "Hands Overlap Problems",
        "Mirror Reflection of Time",
        "Calendar + Clock Combined",
      ]),
    },
    {
      title: "Venn Diagrams & Syllogisms",
      description:
        "Visualize relationships using Venn diagrams. Master syllogism rules for valid conclusions from given statements.",
      order: 10,
      topics: JSON.stringify([
        "Venn Diagram Basics",
        "Two-set & Three-set Diagrams",
        "Maxima-Minima Problems",
        "Syllogism Introduction",
        "All/Some/No Statements",
        "Valid vs Invalid Conclusions",
        "Possibility Cases",
        "Complementary Pairs",
      ]),
    },
    {
      title: "Pattern Recognition",
      description:
        "Identify visual patterns in figures, matrices, and series. Master rotation, reflection, counting, and completion problems.",
      order: 11,
      topics: JSON.stringify([
        "Figure Series Completion",
        "Matrix Patterns",
        "Rotation & Reflection",
        "Element Counting",
        "Embedded Figures",
        "Paper Folding & Cutting",
        "Mirror & Water Images",
        "Dice & Cube Problems",
      ]),
    },
    {
      title: "Exam Pattern Practice",
      description:
        "Practice with actual exam pattern questions from SSC, RRB, IBPS, KPSC, and UPSC. Timed tests and strategy sessions.",
      order: 12,
      topics: JSON.stringify([
        "SSC CGL/CHSL Pattern",
        "RRB NTPC/Group D Pattern",
        "IBPS PO/Clerk Pattern",
        "KPSC FDA/SDA Pattern",
        "UPSC CSAT Pattern",
        "Timed Mock Tests",
        "Error Analysis",
        "Exam Day Strategy",
      ]),
    },
  ];

  for (const mod of aptitudeModules) {
    await prisma.module.create({ data: { ...mod, courseId: aptitude.id } });
  }
  console.log("Aptitude course created");

  // Create sample blog articles
  await prisma.article.deleteMany();
  
  const articles = [
    {
      slug: "getting-started-with-python-programming",
      title: "Getting Started with Python Programming: A Beginner's Guide",
      excerpt: "Python is one of the most beginner-friendly programming languages. Learn why Python is a great first language and how to start your coding journey.",
      content: `Python has become one of the most popular programming languages in the world, and for good reason. Its clean syntax, readability, and versatility make it an excellent choice for beginners and experienced developers alike.

## Why Learn Python?

Python's popularity stems from several key factors:

1. **Readable Syntax**: Python code reads almost like English, making it easier to understand and write.
2. **Versatility**: From web development to data science, AI to automation, Python can do it all.
3. **Large Community**: A vast community means plenty of resources, libraries, and support.
4. **Career Opportunities**: Python skills are in high demand across industries.

## Setting Up Your Environment

Getting started with Python is straightforward:

1. Download Python from python.org
2. Install a code editor like VS Code
3. Write your first program: \`print("Hello, World!")\`

## Your First Steps

Start with the basics:
- Variables and data types
- Basic operations
- Control flow (if statements, loops)
- Functions

Remember, consistency is key. Practice a little every day, and you'll be amazed at your progress.`,
      category: "Python Programming",
      readingTime: 5,
      isPublished: true,
    },
    {
      slug: "introduction-to-machine-learning",
      title: "Introduction to Machine Learning: What You Need to Know",
      excerpt: "Machine learning is transforming industries. Understand the basics of ML, its types, and how you can start learning this exciting field.",
      content: `Machine Learning (ML) is a subset of artificial intelligence that enables computers to learn from data without being explicitly programmed. It's the technology behind recommendation systems, voice assistants, and self-driving cars.

## Types of Machine Learning

### Supervised Learning
The algorithm learns from labeled data. Examples include:
- Classification (spam detection)
- Regression (price prediction)

### Unsupervised Learning
The algorithm finds patterns in unlabeled data:
- Clustering (customer segmentation)
- Dimensionality reduction

### Reinforcement Learning
The algorithm learns through trial and error:
- Game playing
- Robotics

## Getting Started with ML

To begin your ML journey:

1. **Learn Python**: It's the primary language for ML
2. **Understand Statistics**: Basic statistics is essential
3. **Study Linear Algebra**: Matrices and vectors are fundamental
4. **Practice with Libraries**: Start with scikit-learn

## Popular ML Libraries

- **Scikit-learn**: Great for classical ML algorithms
- **TensorFlow**: Google's deep learning framework
- **PyTorch**: Facebook's flexible deep learning library

The field is constantly evolving, so stay curious and keep learning!`,
      category: "Artificial Intelligence",
      readingTime: 6,
      isPublished: true,
    },
    {
      slug: "react-vs-angular-which-to-learn",
      title: "React vs Angular: Which Framework Should You Learn in 2024?",
      excerpt: "Choosing between React and Angular? This comparison will help you understand the differences and make an informed decision for your career.",
      content: `When it comes to frontend development, React and Angular are two of the most popular choices. Both have their strengths, and the right choice depends on your goals and preferences.

## React Overview

React is a JavaScript library developed by Facebook:

**Pros:**
- Flexible and lightweight
- Large ecosystem
- Easy to learn basics
- Great for startups and small projects

**Cons:**
- Need to choose additional libraries
- Can lead to inconsistent codebases

## Angular Overview

Angular is a full-fledged framework by Google:

**Pros:**
- Complete solution out of the box
- Strong typing with TypeScript
- Consistent project structure
- Great for enterprise applications

**Cons:**
- Steeper learning curve
- More opinionated

## Which Should You Choose?

**Choose React if:**
- You want flexibility
- You're building smaller applications
- You prefer a gradual learning curve

**Choose Angular if:**
- You want a complete framework
- You're building large enterprise apps
- You like structured approaches

## The Verdict

Both are excellent choices with strong job markets. React has more job listings, but Angular positions often pay well. Consider learning both eventually, but start with one and master it.`,
      category: "Full Stack Development",
      readingTime: 7,
      isPublished: true,
    },
    {
      slug: "data-science-career-roadmap",
      title: "Data Science Career Roadmap: From Beginner to Professional",
      excerpt: "Planning a career in data science? Follow this comprehensive roadmap to build the skills you need and land your dream job.",
      content: `Data Science is one of the most sought-after careers today. Here's a roadmap to help you navigate your journey from beginner to professional data scientist.

## Phase 1: Foundation (2-3 months)

### Programming
- Learn Python basics
- Understand data structures
- Practice problem-solving

### Mathematics
- Statistics fundamentals
- Probability
- Linear algebra basics

## Phase 2: Data Analysis (2-3 months)

### Tools and Libraries
- NumPy for numerical computing
- Pandas for data manipulation
- Matplotlib/Seaborn for visualization

### SQL
- Database fundamentals
- Complex queries
- Data extraction

## Phase 3: Machine Learning (3-4 months)

### Algorithms
- Supervised learning
- Unsupervised learning
- Model evaluation

### Deep Learning
- Neural networks
- TensorFlow or PyTorch
- Computer vision or NLP basics

## Phase 4: Specialization (Ongoing)

Choose your focus:
- Natural Language Processing
- Computer Vision
- Time Series Analysis
- Recommendation Systems

## Building Your Portfolio

- Complete Kaggle competitions
- Build end-to-end projects
- Contribute to open source
- Write about your learnings

Remember, this is a marathon, not a sprint. Focus on understanding concepts deeply rather than rushing through topics.`,
      category: "Career Guidance",
      readingTime: 8,
      isPublished: true,
    },
    {
      slug: "top-interview-questions-for-developers",
      title: "Top 20 Interview Questions Every Developer Should Prepare For",
      excerpt: "Ace your next technical interview with these commonly asked questions and tips on how to answer them effectively.",
      content: `Technical interviews can be challenging, but preparation is key. Here are the top 20 questions you should be ready to answer.

## Technical Questions

### 1. Explain the difference between == and === in JavaScript
The == operator compares values with type coercion, while === compares both value and type strictly. Always prefer === for predictable comparisons.

### 2. What is the time complexity of common operations?
- Array access: O(1)
- Array search: O(n)
- Hash table lookup: O(1) average
- Binary search: O(log n)
- Sorting (efficient): O(n log n)

### 3. Explain REST API principles
- Stateless - Each request contains all information needed
- Client-server architecture - Separation of concerns
- Uniform interface - Consistent resource naming
- Cacheable - Responses can be cached
- Layered system - Client doesn't know if connected directly to server

### 4. What is the difference between SQL and NoSQL?
SQL databases are relational with fixed schemas, ACID compliance, and use structured query language. NoSQL databases are non-relational with flexible schemas, eventual consistency, and various data models (document, key-value, graph).

### 5. Explain the concept of closures
A closure is a function that has access to variables from its outer (enclosing) scope, even after the outer function has returned. This enables data privacy and function factories.

### 6. What is the difference between GET and POST requests?
GET requests retrieve data and are idempotent (can be repeated safely). POST requests submit data and may cause side effects. GET parameters are in the URL, POST parameters are in the request body.

### 7. Explain the concept of promises and async/await
Promises represent eventual completion of async operations. Async/await is syntactic sugar that makes async code look synchronous, improving readability and error handling.

### 8. What is the difference between stack and heap memory?
Stack stores local variables and function calls (LIFO, fast, limited size). Heap stores dynamically allocated objects (flexible size, slower, requires garbage collection).

### 9. Explain SOLID principles
- Single Responsibility: One class, one purpose
- Open/Closed: Open for extension, closed for modification
- Liskov Substitution: Subtypes must be substitutable
- Interface Segregation: Many specific interfaces over one general
- Dependency Inversion: Depend on abstractions, not concretions

### 10. What is the difference between authentication and authorization?
Authentication verifies identity (who you are). Authorization determines access rights (what you can do). Authentication comes first, then authorization.

## Behavioral Questions

### 11. Tell me about a challenging project
Use the STAR method: Situation (context), Task (your responsibility), Action (what you did), Result (outcome and learnings).

### 12. How do you handle disagreements with team members?
Focus on active listening, understanding different perspectives, presenting data-driven arguments, and finding common ground. Escalate professionally if needed.

### 13. Describe a time you failed and what you learned
Be honest about the failure, take responsibility, explain what you learned, and describe how you've applied that learning since.

### 14. How do you stay updated with technology?
Mention specific resources: tech blogs, podcasts, conferences, online courses, side projects, open source contributions, and professional communities.

### 15. How do you prioritize tasks when everything is urgent?
Discuss frameworks like Eisenhower Matrix, communication with stakeholders, understanding true deadlines, and breaking down large tasks.

## System Design Questions

### 16. Design a URL shortener
Key considerations: Base62 encoding for short URLs, database design (key-value store), handling collisions, analytics tracking, caching strategy, and horizontal scaling.

### 17. Design a rate limiter
Discuss algorithms (token bucket, sliding window), storage (Redis), distributed systems considerations, and graceful degradation.

### 18. How would you design a cache system?
Cover cache invalidation strategies (TTL, LRU, LFU), cache-aside vs write-through patterns, distributed caching, and cache stampede prevention.

### 19. Design a notification system
Consider multiple channels (push, email, SMS), user preferences, delivery guarantees, rate limiting, and template management.

### 20. How would you scale a database?
Discuss vertical vs horizontal scaling, read replicas, sharding strategies, connection pooling, query optimization, and caching layers.

## Tips for Success

1. **Practice coding**: Use platforms like LeetCode and HackerRank
2. **Review fundamentals**: Data structures, algorithms, and system design
3. **Prepare examples**: Have STAR stories ready for behavioral questions
4. **Ask questions**: Show genuine interest in the role and company
5. **Think aloud**: Explain your reasoning during technical problems
6. **Stay calm**: Take your time and ask clarifying questions

Good luck with your interviews!`,
      category: "Interview Preparation",
      readingTime: 10,
      isPublished: true,
    },
    {
      slug: "prompt-engineering-best-practices",
      title: "Prompt Engineering Best Practices: Get Better Results from AI",
      excerpt: "Learn how to write effective prompts that get you better, more accurate results from AI tools like ChatGPT and Claude.",
      content: `Prompt engineering is the art of communicating effectively with AI models. Here's how to get the best results.

## The Basics of Good Prompts

### Be Specific
Instead of: "Write about dogs"
Try: "Write a 200-word article about the health benefits of owning a dog, targeting first-time pet owners"

### Provide Context
Give the AI relevant background information to improve accuracy.

### Use Examples
Show the AI what you want with examples (few-shot prompting).

## Advanced Techniques

### Chain of Thought
Ask the AI to think step by step:
"Solve this problem step by step, showing your reasoning at each stage."

### Role Prompting
Assign a role: "You are an experienced Python developer. Review this code..."

### Output Formatting
Specify the format: "Respond in JSON format with the following fields..."

## Common Mistakes to Avoid

1. **Being too vague**: Leads to generic responses
2. **Overloading prompts**: Keep it focused
3. **Not iterating**: Refine your prompts based on results

## Practical Applications

- **Writing**: Content creation, editing, summarization
- **Coding**: Code generation, debugging, explanation
- **Analysis**: Data interpretation, research synthesis
- **Learning**: Explanations, practice problems

Remember, prompt engineering is a skill that improves with practice. Experiment and learn from each interaction!`,
      category: "Artificial Intelligence",
      readingTime: 6,
      isPublished: true,
    },
    {
      slug: "building-your-first-react-app",
      title: "Building Your First React App: A Step-by-Step Tutorial",
      excerpt: "Ready to build with React? Follow this hands-on tutorial to create your first React application from scratch.",
      content: `React is a powerful library for building user interfaces. Let's create your first React app together.

## Setting Up

### Prerequisites
- Node.js installed
- Basic JavaScript knowledge
- A code editor (VS Code recommended)

### Create Your App
\`\`\`bash
npx create-react-app my-first-app
cd my-first-app
npm start
\`\`\`

## Understanding the Structure

- **src/**: Your source code
- **public/**: Static files
- **package.json**: Dependencies and scripts

## Your First Component

\`\`\`jsx
function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}
\`\`\`

## Adding State

\`\`\`jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
\`\`\`

## Next Steps

1. Learn about useEffect for side effects
2. Explore React Router for navigation
3. Try state management with Context or Redux
4. Build more complex projects

The best way to learn React is by building. Start with small projects and gradually increase complexity. Happy coding!`,
      category: "Full Stack Development",
      readingTime: 8,
      isPublished: true,
    },
    {
      slug: "essential-resources-for-learning-programming",
      title: "Essential Resources for Learning Programming in 2024",
      excerpt: "Discover the best free and paid resources to learn programming, from online courses to books and practice platforms.",
      content: `Learning to program has never been more accessible. Here are the best resources to accelerate your learning journey.

## Free Resources

### Online Platforms
- **freeCodeCamp**: Comprehensive web development curriculum
- **The Odin Project**: Full-stack JavaScript path
- **CS50**: Harvard's intro to computer science

### Documentation
- **MDN Web Docs**: Web development reference
- **Python.org**: Official Python documentation
- **DevDocs**: Unified documentation browser

### YouTube Channels
- Traversy Media
- The Net Ninja
- Fireship

## Paid Resources

### Course Platforms
- **Udemy**: Affordable, wide variety
- **Coursera**: University-level courses
- **Frontend Masters**: Expert-led workshops

### Books
- "Eloquent JavaScript" by Marijn Haverbeke
- "Python Crash Course" by Eric Matthes
- "Clean Code" by Robert C. Martin

## Practice Platforms

- **LeetCode**: Algorithm practice
- **HackerRank**: Coding challenges
- **Codewars**: Gamified learning
- **Project Euler**: Mathematical problems

## Tips for Effective Learning

1. **Be consistent**: Code every day, even if just 30 minutes
2. **Build projects**: Apply what you learn
3. **Join communities**: Discord, Reddit, local meetups
4. **Teach others**: Explaining reinforces learning

Remember, the best resource is the one you'll actually use. Find what works for you and stick with it!`,
      category: "Learning Resources",
      readingTime: 7,
      isPublished: true,
    },
    {
      slug: "sql-interview-questions-complete-guide",
      title: "21 Essential SQL Interview Questions: Complete Guide",
      excerpt: "Master SQL interviews with this comprehensive guide covering database backups, replication, normalization, performance optimization, and more.",
      content: `SQL is a fundamental skill for any data professional. This guide covers 21 essential SQL interview questions that you need to know.

## 1. How do you manage database backups and restoration?

Managing database backups involves several key steps:

**Backup Types:**
- **Full Backup**: Includes everything in the database. Perform regularly (weekly/daily).
- **Differential Backup**: Captures only changed data since last full backup.
- **Transaction Log Backup**: Records all transactions, enabling point-in-time recovery.

**Restoration Process:**
1. Restore Full Backup first
2. Apply Differential Backup
3. Apply Transaction Log Backups

## 2. Types of Data Replication in SQL

Data replication copies data to different locations for availability:

- **Transactional Replication**: Replicates data to remote databases
- **Snapshot Replication**: Replicates data exactly as it appears (simplest method)
- **Merge Replication**: Both publisher and subscriber can make changes
- **Peer-to-peer Replication**: Database replicated to multiple subscribers

## 3. SQL Integration with Programming Languages

- **Embedded SQL**: SQL statements embedded in C, C++, Java
- **Scripting Languages**: PHP, Ruby have built-in SQL support
- **ORM**: Django ORM, SQLAlchemy for object-oriented database access
- **Database Drivers**: sqlite3, psycopg2 for direct SQL execution
- **REST APIs**: Applications expose APIs that interact with databases

## 4. Error Handling in SQL

- **TRY…CATCH Blocks**: Handle exceptions in SQL Server
- **Error Codes**: Use ERROR_NUMBER(), ERROR_MESSAGE()
- **Transaction Control**: BEGIN, COMMIT, ROLLBACK
- **Built-in Functions**: Oracle's EXCEPTION blocks in PL/SQL

## 5. Internationalization and Localization

- **Character Sets**: Support different languages
- **Collations**: Define string comparison rules
- **Data Types**: NVARCHAR, NCHAR for Unicode
- **Locale-Specific Formats**: Dates, times, currencies

## 6. Importance of Data Types

Data types help databases:
- Understand what kind of information is stored
- Keep data organized
- Optimize storage space
- Ensure data integrity

## 7. Text Searching and Pattern Matching

**LIKE Operator:**
- \`%\` matches any number of characters
- \`_\` matches exactly one character

**Full-Text Search:**
- Find words/phrases in large collections
- Handle natural language queries

## 8. Database Normalization

**1NF**: Atomic values, unique column names
**2NF**: 1NF + no partial dependencies
**3NF**: 2NF + no transitive dependencies
**BCNF**: 3NF + X must be superkey in X->Y
**4NF**: No multi-valued dependencies
**5NF**: No further non-loss decomposition

## 9. SQL for Reporting and Analysis

- Basic Data Retrieval with SELECT
- Filtering with WHERE
- Aggregating with COUNT, SUM, AVG
- Window Functions: RANK, LEAD, LAG
- Stored Procedures and UDFs
- Export to visualization tools

## 10. Database Design Best Practices

1. Apply Normalization Rules
2. Use Proper Data Types
3. Define Primary and Foreign Keys
4. Use Indexing strategically
5. Plan for Scalability
6. Regular Backups
7. Regular Maintenance

## 11. Managing Large Databases

- **Indexing**: Create maps for quick data access
- **Partitioning**: Break tables into smaller pieces
- **Caching**: Store frequently accessed data
- **Query Optimization**: Rewrite queries for efficiency

## 12. Denormalization Trade-offs

**Advantages:**
- Faster query performance
- Simpler query logic

**Disadvantages:**
- More storage space
- Data integrity risks
- Complex maintenance

## 13. Retrieving Historical Data

- **Auditing**: Store all changes in special tables
- **Snapshot Tables**: Store data at specific points
- **Transaction Logs**: Reconstruct data changes

## 14. Data Warehousing

Characteristics: Subject-Oriented, Integrated, Time-variant, Non-Volatile

SQL's Role: Querying, ETL processes, Reporting

## 15. Database Security

- Regular Security Audits
- Strong Password Policies
- Robust Backup Strategies
- Access Control with GRANT/REVOKE

## 16. Time Zone Handling

- Store timestamps in UTC
- Use time zone aware data types
- Store user time zone preferences

## 17. Temporary Tables vs Table Variables

**Temporary Tables**: # prefix, large data, session-scoped
**Table Variables**: DECLARE, smaller data, batch-scoped

## 18. Wildcard Implications

- Flexibility in searching
- Performance impact (especially leading wildcards)
- Potential for unexpected results

## 19. Ensuring Data Integrity

- Proper schema design
- Normalization
- Constraints (NOT NULL, UNIQUE, CHECK)
- ACID transactions
- Triggers for complex rules

## 20. Performance Issues and Solutions

**Issues**: Slow queries, indexing problems, locking, resource contention

**Solutions**: Query optimization, proper indexing, transaction management

## 21. Large-Scale Data Migrations

**Four Stages:**
1. Extract from source
2. Standardize formats
3. Aggregate and cleanse
4. Load to target

Use batch processing, staging tables, and thorough testing.`,
      category: "Interview Preparation",
      readingTime: 15,
      isPublished: true,
    },
    {
      slug: "jenkins-build-automation-nodejs",
      title: "Jenkins Build Automation: Complete CI/CD Guide for Node.js",
      excerpt: "Learn how to automate your Node.js application builds using Jenkins Pipeline. This guide covers plugin installation, pipeline creation, GitHub integration, and deployment automation.",
      content: `Automating builds increases development efficiency, reduces human error, and enables Continuous Integration (CI). This guide will walk you through setting up Jenkins Pipeline for your Node.js applications.

## Overview

**Purpose:** Automate the build and deployment process of a Node.js application using Jenkins Pipeline.

**What This Guide Covers:**
- Jenkins plugins installation
- Pipeline job creation
- GitHub repository integration
- Automating dependency installation, build, and deployment

---

## Step 1: Install Jenkins & Required Plugins

First, install Jenkins on your system. Then ensure these essential plugins are installed:

**Required Plugins:**
- **Pipeline** - Core pipeline functionality
- **Git** - Git repository integration
- **NodeJS Plugin** - Node.js build environment

**To Install Plugins:**
1. Go to **Manage Jenkins** → **Plugins**
2. Select the required plugins
3. Click **Install**

---

## Step 2: Create a Jenkins Pipeline Job

1. Go to **Jenkins Dashboard** → **New Item**
2. Enter your job name (e.g., "NodeJS-Automation")
3. Select **Pipeline**
4. Click **OK**

The configuration page will open for further setup.

---

## Step 3: Configure GitHub Repository

If you're storing the Jenkinsfile in your repository:

1. Under **Pipeline** → **Definition**, select **Pipeline script from SCM**
2. Choose **Git** as the SCM
3. Enter your **GitHub Repository URL**
4. Add credentials if the repository is private
5. Set the branch (e.g., main or master)
6. Set **Script Path** to: Jenkinsfile

---

## Step 4: Create the Jenkinsfile

Create a Jenkinsfile in your repository root with the following pipeline configuration:

**Pipeline Structure:**

pipeline - agent any - tools nodejs NodeJS-18

**Stages:**

**1. Checkout Stage**
- checkout scm
- echo Code checked out successfully

**2. Install Dependencies Stage**
- sh npm install
- echo Dependencies installed

**3. Build Stage**
- sh npm run build --if-present
- echo Build completed

**4. Test Stage**
- sh npm test --if-present
- echo Tests completed

**5. Deploy Stage**
- sh nohup node app.js > app.log 2>&1 &
- echo Application started

**Post Actions:**
- always: archiveArtifacts artifacts *.log
- success: echo Build successful!
- failure: echo Build failed!

---

## Step 5: Save & Run the Pipeline

1. Click **Apply & Save**
2. Hit **Build Now** to test
3. View logs in **Console Output**

---

## What This Jenkinsfile Automates

**Checkout:** Pulls latest code from Git repository

**Install Dependencies:** Runs npm install

**Build:** Runs npm run build if script exists

**Test:** Runs npm test if script exists

**Deploy:** Starts Node.js application in background

**Post Actions:** Archives logs and reports status

---

## Best Practices

1. **Use Environment Variables** - Store sensitive data in Jenkins credentials
2. **Add Notifications** - Configure email or Slack notifications for build status
3. **Implement Webhooks** - Set up GitHub webhooks for automatic builds on push
4. **Use Docker** - Consider containerizing your application for consistent environments
5. **Add Quality Gates** - Include linting and code coverage checks

---

## Troubleshooting Common Issues

**Build fails at npm install:**
- Check Node.js version compatibility
- Verify package.json exists
- Check network connectivity

**Permission denied errors:**
- Ensure Jenkins user has proper permissions
- Check file ownership in workspace

**Application won't start:**
- Verify port availability
- Check application logs for errors

---

## Conclusion

This Jenkins Pipeline automates the entire build and deployment workflow:

- Automatic code checkout from Git
- Dependency management with npm
- Build automation for production
- Automated testing integration
- Local deployment with logging
- Artifact archiving for debugging

By implementing this CI/CD pipeline, you eliminate manual build steps, reduce errors, and enable faster, more reliable deployments.`,
      category: "Full Stack Development",
      readingTime: 8,
      isPublished: true,
    },
    {
      slug: "devops-benefits-business-objectives",
      title: "DevOps Benefits Mapped to Business Objectives: A Complete Guide",
      excerpt: "Discover how DevOps practices align IT advancements with corporate objectives to produce measurable commercial value. Learn the key benefits from faster deployments to enhanced security.",
      content: `DevOps is more than just a technical approach. It aligns IT advancements with important corporate objectives to produce measurable commercial value. Here's how specific DevOps benefits and practices relate directly to business goals.

## 1. Improved Operational Support and Faster Fixes

Our team can effectively deploy and test code across multiple environments by utilizing automation through our Continuous Integration (CI) and Continuous Delivery (CD) pipeline.

**A Key Component of the DevOps Methodology:**

The collaborative approach, in which several teams work together to communicate efficiently and uphold uniformity in scripting and configuration management procedures.

**Business Impact:**
- Reduced downtime
- Faster incident resolution
- Improved system reliability

---

## 2. Improved IT, Automation, Collaboration, and Culture Processes

The main advantage of DevOps for companies is **automation**. In a perfect world, we wouldn't have to perform any monotonous tasks twice. We would automate instead. The ideal basis for automation is created when the development and operations teams are in sync and incorporate robust procedures.

**Key Statistics:**
- Teams can frequently access more tests or iterations with a single click when DevOps standards are strong
- Organizations can deploy up to **46 times more frequently** than non-DevOps counterparts

**Practical Example:**

You might want two systems to function similarly for various clients or geographical areas while maintaining data segregation. With DevOps, a solution is still just a click away.

---

## 3. Implementing Strict Security Procedures

DevOps is also successful in security and shared accountability by combining several strong practices. Instead of being tacked on at the last minute, this procedure starts early in the development phase and continues as new features are added to applications.

**Practices Made Possible by Automation Tools:**
- Code analysis
- Stress testing
- Confirming that security measures are operating as intended
- Policies pertaining to code modification and access control

These practices help guard against needless security risks.

---

## 4. Enhanced Quality and Customer Satisfaction

Any software's main objective is to satisfy its users, and DevOps' meticulous methodology promotes this goal throughout the whole development process.

**How DevOps Enhances Customer Satisfaction:**

1. **Deep Understanding** - Professional DevOps firms rely on thorough awareness of customer requirements
2. **Industry Experience** - Wealth of experience in specific industries
3. **Continuous Feedback** - After software release, dedication to customer satisfaction is maintained by answering comments and fixing user problems
4. **Future Upgrades** - Developing updates that promptly address end user preferences

---

## 5. Faster Time to Market

By increasing development velocity, DevOps enables you to launch your software faster. Having a quicker time to market gives you a competitive advantage since you'll be able to reach clients before your competitors.

**Throughput is Increased via DevOps for Several Reasons:**

**Automation:**
Team members can concentrate on important, high-impact work and increase efficiency by automating repetitive chores.

**Collaborative Culture:**
People may more readily access and exchange knowledge in a collaborative culture, which increases efficiency and promotes quicker creativity and problem-solving.

**Higher Output Without Sacrificing Quality:**
DevOps techniques boost output without sacrificing quality, guaranteeing dependable and consistent outcomes.

---

## 6. Reduced Defects and Quicker Correction

When developers figure out how to fix a flaw, the fix must be made public. The release could take days or months if you follow a poor approach, while the repair could only take minutes.

**DevOps Enforces:**
- Extremely detailed logging
- Comprehensive monitoring
- Precise alerting procedures

**Benefits:**
- You are informed as soon as something goes wrong
- More precise information that aids in troubleshooting
- Faster issue identification (sometimes even instantly)

**The 1% Rule:**
As any DevOps engineer is aware, you spend 1% of your time actually correcting bugs and 99% of your time investigating them. DevOps saves you time by identifying issues more quickly.

---

## 7. More Stable Operating Environments

Another benefit is the increased stability in production environments. It doesn't matter which scripting language you're using:
- Python
- Terraform
- PowerShell
- Bash
- CloudFormation

The automation and certainty of DevOps procedures provide stability across a range of languages and environments.

**Achieving Stability Through:**
- Repetition
- Avoiding unnecessary changes
- Automated processes
- Consistent change tracking

**Example Problem Solved:**

Developers in dev environments with administrative permissions can make changes, but then later forget about them. This hurts your change history reporting and makes it harder to track down changes. However, with DevOps, all processes are automated, and teams can be sure that their updates are stable.

---

## 8. Encouraged Innovation and Focus

"If we deploy faster, it will just give developers more time to find innovations," developers joke. Even though teams make jokes about it, there is truth behind it.

**Increasing deployment speed allows for innovation.**

One of the benefits of DevOps for a company is that it allows you to experiment with new technologies and creative ideas in a sandbox setting. Effective DevOps management allows you to determine the quality of a fresh concept during the product journey.

---

## Summary: DevOps Benefits to Business Objectives

| DevOps Benefit | Business Objective |
|----------------|-------------------|
| CI/CD Pipeline | Faster deployments, reduced downtime |
| Automation | Increased efficiency, reduced manual errors |
| Security Integration | Risk mitigation, compliance |
| Quality Assurance | Customer satisfaction, brand reputation |
| Faster Time to Market | Competitive advantage |
| Quick Bug Fixes | Reduced costs, better user experience |
| Stable Environments | Reliability, predictability |
| Innovation Culture | Business growth, market leadership |

---

## Conclusion

DevOps bridges the gap between technical excellence and business success. By implementing DevOps practices, organizations can:

- Deploy more frequently and reliably
- Respond to market changes faster
- Maintain higher security standards
- Deliver better customer experiences
- Foster a culture of continuous improvement

The key is to view DevOps not just as a set of tools, but as a cultural shift that aligns technology teams with business objectives for measurable commercial value.`,
      category: "Full Stack Development",
      readingTime: 10,
      isPublished: true,
    },
    {
      slug: "deepbrain-ai-complete-guide",
      title: "DeepBrain AI: Complete Guide to AI Video Generation & Virtual Avatars",
      excerpt: "Discover how DeepBrain AI is revolutionizing content creation with lifelike virtual avatars, text-to-speech, and AI-driven video generation across 80+ languages.",
      content: `Imagine a future where connecting with technology is as natural as conversing with a friend. That is the idea behind DeepBrain AI, a groundbreaking platform that is altering how people engage with AI.

## What is DeepBrain AI?

DeepBrain AI is changing the way humans engage with technology by combining human-like communication and advanced artificial intelligence.

**Key Capabilities:**
- Natural conversations in over 80 languages
- Lifelike virtual avatars
- Text-to-speech that sounds like real speech
- Realistic video generation from text

DeepBrain AI is redefining industries such as customer service, education, and broadcasting by transforming digital interactions into meaningful, human-like experiences.

---

## How Does DeepBrain Work?

DeepBrain AI is driven by powerful machine learning algorithms and natural language processing. Here's how it works:

### 1. Data Collection and Preprocessing
DeepBrain AI begins by putting together big sets of data that include speech patterns, text, and other useful information. Cleansing and cleaning this data makes sure that it can be used to train machine learning models.

### 2. Training the Model
The models are trained with deep learning techniques. Based on the data they are given, these models learn to spot trends, pick up subtleties in language, and figure out what people are saying.

**Key Technologies:**
- Neural networks
- Recurrent Neural Networks (RNNs)
- Transformers

### 3. Natural Language Understanding (NLU)
Once trained, the AI system can understand and process what the user says. NLP helps DeepBrain AI break down sentences, find keywords, and figure out what people are trying to say.

### 4. Speech Recognition and Synthesis
- Speech recognition turns spoken words into text
- Text-to-speech synthesis creates natural, smooth responses

### 5. Context Awareness
DeepBrain AI remembers what you said last time and changes how it responds to make future conversations clearer and useful.

### 6. Continuous Learning
DeepBrain AI learns all the time from new data and interactions, improving accuracy and performance with each conversation.

---

## Creating AI-Driven Videos with DeepBrain

**Steps to Create Videos:**

1. Upload a script or paste text into the AI video editor
2. Select a pre-made AI avatar or upload a custom avatar
3. The AI analyzes text and automatically generates lip sync and facial expressions
4. Choose from multiple realistic AI voices using text-to-speech
5. Add graphics, logos, images, and video clips
6. Preview the AI-generated video and make edits
7. Download the final video in high-resolution MP4

---

## Key Features of DeepBrain

- **Automatic Editing:** Speeds up video production by automating editing tasks
- **Scene Detection:** Finds and separates video scenes for precise editing
- **Voice Synthesis:** Creates high-quality voiceovers using AI technology
- **Metadata Application:** Makes videos easier to find and organize
- **Performance Analytics:** Provides insights about video success metrics

---

## Benefits of DeepBrain AI

### Advanced Natural Language Processing (NLP)
Uses cutting-edge NLP algorithms to understand and reply to user inputs very accurately.

### Real-Time Speech Recognition and Synthesis
Processes spoken language in real-time, turning it into text and producing lifelike responses.

### Scalable Machine Learning Models
Built on solid deep learning frameworks, can manage large amounts of data.

### Customizable AI Avatars
Create lifelike avatars with synchronized lip movements, facial emotions, and speech modulation.

### Contextual Memory
Remembers context of past interactions for more meaningful conversations.

### Integration Capabilities
Works seamlessly with customer care systems, chatbots, and video editing software.

### Automation and Efficiency
Saves time and money by automating repetitive processes.

---

## Use Cases

**Customer Service:** Live chatbots providing real-time, human-like conversations

**Education:** Instructional videos and virtual tutors for personalized learning

**Healthcare:** Virtual assistants for patient information and support

**Marketing:** Compelling product demos and explainer videos

**Media & Broadcasting:** Lifelike AI avatars for news presentations

---

## Pros and Cons

**Pros:**
- Easy to use for beginners
- Time-saving automation
- High-quality professional output
- Versatile for marketers, educators, influencers
- Efficient content management

**Cons:**
- Learning curve for advanced features
- Limited customization for specialized projects
- Resource-intensive processing
- Subscription cost for small businesses
- AI dependency may lead to occasional errors

---

## Conclusion

DeepBrain AI is changing the way content is made with its realistic avatars, powerful AI-driven video generation, and text-to-speech features. Its simple design and automation features make things easier and faster while still producing high-quality results.`,
      category: "Artificial Intelligence",
      readingTime: 12,
      isPublished: true,
    },
    {
      slug: "dbms-sql-complete-notes",
      title: "DBMS & SQL Complete Notes: From Basics to Advanced",
      excerpt: "Comprehensive guide covering Database Management Systems, ER diagrams, normalization, transactions, ACID properties, relational algebra, and complete SQL syntax with examples.",
      content: `A complete reference guide for Database Management Systems (DBMS) and SQL. This covers everything from basic concepts to advanced topics.

## What is a Database?

A database is a collection of related data which represents some aspect of the real world. A database system is designed to be built and populated with data for a certain task.

**Database Management System (DBMS)** is software for storing and retrieving users' data while considering appropriate security measures.

### Problems DBMS Solves:
1. Data redundancy and inconsistency
2. Difficulty in accessing data
3. Data isolation (multiple files and formats)
4. Integrity problems
5. Atomicity of updates
6. Concurrent access by multiple users
7. Security problems

---

## ER Diagrams

ER diagram (Entity Relationship diagram) is a conceptual model that gives the graphical representation of the logical structure of the database.

**Components:**
- Entity Sets
- Attributes
- Relationship Sets

### Entity Sets

**Strong Entity Set:** Contains sufficient attributes to uniquely identify all its entities (has primary key)

**Weak Entity Set:** Does not contain sufficient attributes to uniquely identify entities (has discriminator/partial key)

### Relationships

- **Unary:** One entity set participates
- **Binary:** Two entity sets participate
- **Ternary:** Three entity sets participate
- **N-ary:** 'n' entity sets participate

### Cardinality Constraints

- **One-to-One:** Entity in A associated with at most one in B
- **One-to-Many:** Entity in A associated with any number in B
- **Many-to-One:** Entity in A associated with at most one in B
- **Many-to-Many:** Any number of associations both ways

---

## Types of Attributes

- **Simple:** Cannot be divided further (e.g., Age)
- **Composite:** Composed of many simple attributes (e.g., Name, Address)
- **Multi-Valued:** Can take more than one value (e.g., Mobile No, Email)
- **Derived:** Can be derived from other attributes (e.g., Age from DOB)
- **Key:** Can identify an entity uniquely (e.g., Roll No)

---

## Keys in DBMS

- **Super Key:** Set of attributes that can identify each tuple uniquely
- **Candidate Key:** Minimal set of attributes for unique identification
- **Primary Key:** Selected candidate key (unique and NOT NULL)
- **Alternate Key:** Unused candidate keys
- **Foreign Key:** References primary key of another table
- **Composite Key:** Primary key with multiple attributes
- **Unique Key:** Unique for all records, may have NULL

---

## Normalization

Process of organizing data to reduce redundancy and ensure data integrity.

### First Normal Form (1NF)
- All columns contain atomic values
- Each column contains single type values
- Each column has unique name

### Second Normal Form (2NF)
- Already in 1NF
- No partial dependency exists

### Third Normal Form (3NF)
- Already in 2NF
- No transitive dependency for non-prime attributes

### Boyce-Codd Normal Form (BCNF)
- Already in 3NF
- For each non-trivial FD 'A → B', A is a super key

---

## Transactions

A transaction is a single logical unit of work formed by a set of operations.

### Transaction States:
1. **Active:** Instructions being executed
2. **Partially Committed:** Last instruction executed
3. **Committed:** Changes stored in database
4. **Failed:** Execution cannot continue
5. **Aborted:** Changes undone (rolled back)
6. **Terminated:** Life cycle ends

### ACID Properties

- **Atomicity:** Transaction occurs completely or not at all
- **Consistency:** Database remains consistent before and after
- **Isolation:** Multiple transactions can occur without inconsistency
- **Durability:** Changes are permanent after successful execution

---

## SQL Commands

### DDL (Data Definition Language)
- CREATE, ALTER, DROP, TRUNCATE, RENAME

### DML (Data Manipulation Language)
- SELECT, INSERT, UPDATE, DELETE, MERGE

### DCL (Data Control Language)
- GRANT, REVOKE

### TCL (Transaction Control Language)
- COMMIT, ROLLBACK, SAVEPOINT

---

## Essential SQL Syntax

### SELECT
SELECT column1, column2 FROM table_name;
SELECT * FROM table_name;

### WHERE
SELECT * FROM table_name WHERE condition;

### ORDER BY
SELECT * FROM table_name ORDER BY column ASC|DESC;

### INSERT
INSERT INTO table_name (col1, col2) VALUES (val1, val2);

### UPDATE
UPDATE table_name SET col1 = val1 WHERE condition;

### DELETE
DELETE FROM table_name WHERE condition;

---

## Aggregate Functions

- **MIN():** Returns smallest value
- **MAX():** Returns largest value
- **COUNT():** Returns number of rows
- **AVG():** Returns average value
- **SUM():** Returns total sum

---

## JOIN Types

### INNER JOIN
Returns records with matching values in both tables

### LEFT JOIN
Returns all records from left table, matching from right

### RIGHT JOIN
Returns all records from right table, matching from left

### FULL OUTER JOIN
Returns all records when there's a match in either table

---

## GROUP BY and HAVING

**GROUP BY:** Groups rows with same values into summary rows

**HAVING:** Filters groups (used with aggregate functions where WHERE cannot be used)

---

## LIKE Operator Patterns

- **'a%':** Starts with "a"
- **'%a':** Ends with "a"
- **'%or%':** Contains "or"
- **'_r%':** "r" in second position
- **'a_%':** Starts with "a", at least 2 characters

---

## Table Operations

### CREATE TABLE
CREATE TABLE table_name (column1 datatype, column2 datatype);

### DROP TABLE
DROP TABLE table_name;

### TRUNCATE TABLE
TRUNCATE TABLE table_name;

### ALTER TABLE
ALTER TABLE table_name ADD column_name datatype;
ALTER TABLE table_name DROP COLUMN column_name;

This comprehensive guide covers all essential DBMS and SQL concepts needed for interviews and practical database work.`,
      category: "Data Science",
      readingTime: 20,
      isPublished: true,
    },
  ];

  for (const article of articles) {
    await prisma.article.create({ data: article });
  }
  console.log("Blog articles created");

  // Create testimonials
  await prisma.testimonial.deleteMany();
  const testimonials = [
    {
      name: "Saundarya Kalashetti",
      role: "Python | Power BI | Data Analytics",
      content: "Your teaching method is outstanding. The clarity and practical examples really help in understanding the concepts better.",
      isVisible: true,
      order: 1,
    },
    {
      name: "Shalini P Tengil",
      role: "HR Associate at SLONIX SOLUTIONS",
      content: "Congratulations! Great leadership and a meaningful contribution. Keep up the amazing work.",
      isVisible: true,
      order: 2,
    },
    {
      name: "Syed Naveeth",
      role: "Data Science Cognoscente | B.Tech",
      content: "Congrats! Leading and guiding interns like this is truly commendable, a great milestone and meaningful contribution.",
      isVisible: true,
      order: 3,
    },
  ];

  for (const testimonial of testimonials) {
    await prisma.testimonial.create({ data: testimonial });
  }
  console.log("Testimonials created");

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
