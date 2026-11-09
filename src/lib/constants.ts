// Brand Colors
export const colors = {
  navy: {
    deep: "#080B1D",
    secondary: "#11152D",
    light: "#1a1f3d",
  },
  brand: {
    purple: "#8057F5",
    purpleLight: "#9d7af7",
    purpleDark: "#6a45d4",
    blue: "#328BFF",
    blueLight: "#5aa3ff",
    lightBlue: "#75C7FF",
  },
  text: {
    primary: "#FFFFFF",
    secondary: "#A8B0C8",
    muted: "#6B7280",
  },
} as const;

// Navigation Links
export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/courses", label: "Courses" },
  { href: "/programs", label: "Programs" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
] as const;

// Course Levels
export const courseLevels = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Beginner to Intermediate",
  "Beginner to Advanced",
] as const;

export type CourseLevel = (typeof courseLevels)[number];

// Blog Categories
export const blogCategories = [
  "Artificial Intelligence",
  "Data Science",
  "Full Stack Development",
  "Python Programming",
  "Career Guidance",
  "Interview Preparation",
  "Learning Resources",
] as const;

export type BlogCategory = (typeof blogCategories)[number];

// Program Types
export const programTypes = [
  {
    id: "college-student",
    title: "College Student Training",
    description:
      "Comprehensive technical training programs designed for college students to build industry-relevant skills alongside their academic curriculum.",
    icon: "GraduationCap",
  },
  {
    id: "fresher-job-readiness",
    title: "Fresher Job-Readiness Programs",
    description:
      "Intensive programs focused on preparing fresh graduates with practical skills, project experience, and interview preparation for their first tech job.",
    icon: "Briefcase",
  },
  {
    id: "professional-upskilling",
    title: "Working Professional Upskilling",
    description:
      "Flexible learning paths for working professionals looking to upgrade their skills, transition to new technologies, or advance their careers.",
    icon: "TrendingUp",
  },
  {
    id: "one-to-one-mentorship",
    title: "One-to-One Mentorship",
    description:
      "Personalized mentorship sessions tailored to your specific learning goals, career aspirations, and pace of learning.",
    icon: "Users",
  },
  {
    id: "corporate-training",
    title: "Corporate Technical Training",
    description:
      "Customized training solutions for organizations looking to upskill their teams in modern technologies and development practices.",
    icon: "Building2",
  },
  {
    id: "weekend-bootcamps",
    title: "Weekend Bootcamps",
    description:
      "Intensive weekend programs for busy professionals who want to learn new skills without disrupting their work schedule.",
    icon: "Calendar",
  },
] as const;

// Project Showcase Data
export const projectShowcase = [
  {
    id: "food-zone",
    title: "Food Zone - Online Food Delivery",
    description:
      "A fully responsive food ordering website with dynamic UI, restaurant listings, menu browsing, cart management, and smooth animations. Features location-based search and multiple cuisine categories.",
    technologies: ["HTML5", "CSS3", "JavaScript", "GSAP Animation"],
    skills: ["Frontend Development", "Animation", "Responsive Design", "UI/UX"],
    difficulty: "Intermediate",
    outcome: "A complete food delivery web experience",
    liveUrl: "https://sparkling-sunburst-d6bb1e.netlify.app/",
    image: "/images/projects/food-zone.jpg",
  },
  {
    id: "mario-game",
    title: "Mario Jump Game",
    description:
      "An interactive Mario jump game built with React.js featuring character movement, obstacle avoidance, score tracking, and high score persistence. Classic retro gaming experience in the browser.",
    technologies: ["React", "JavaScript", "HTML/CSS", "Game Logic"],
    skills: ["Game Development", "React State Management", "Animation", "Event Handling"],
    difficulty: "Intermediate",
    outcome: "A playable browser-based Mario game",
    liveUrl: "https://mario-game-tan-one.vercel.app/",
    image: "/images/projects/mario-game.png",
  },
  {
    id: "crypto-tracker",
    title: "YCrypto - Cryptocurrency Tracker",
    description:
      "A real-time cryptocurrency tracking dashboard with live price charts, multiple currency support (INR, USD, EUR), historical data visualization, and exchange information.",
    technologies: ["React", "Chart.js", "CoinGecko API", "Axios"],
    skills: ["API Integration", "Data Visualization", "Real-time Updates", "Financial Apps"],
    difficulty: "Intermediate",
    outcome: "A live crypto price tracking dashboard",
    liveUrl: "https://ycrypto04.netlify.app/",
    image: "/images/projects/crypto-tracker.png",
  },
  {
    id: "sales-dashboard",
    title: "Sales Analytics Dashboard",
    description:
      "An interactive Power BI dashboard analyzing sales performance across regions, products, and time periods. Features KPIs, trend analysis, and drill-down capabilities for business insights.",
    technologies: ["Power BI", "DAX", "SQL", "Excel"],
    skills: ["Business Intelligence", "Data Visualization", "DAX Formulas", "Report Design"],
    difficulty: "Intermediate",
    outcome: "A comprehensive sales analytics solution",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
  },
  {
    id: "hr-analytics",
    title: "HR Analytics Dashboard",
    description:
      "Power BI dashboard for HR metrics including employee attrition analysis, department-wise headcount, salary distribution, performance ratings, and workforce demographics.",
    technologies: ["Power BI", "DAX", "Python", "Excel"],
    skills: ["HR Analytics", "Data Modeling", "Statistical Analysis", "Dashboard Design"],
    difficulty: "Intermediate",
    outcome: "An HR insights and reporting tool",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
  },
  {
    id: "sentiment-analysis",
    title: "Twitter Sentiment Analysis",
    description:
      "An NLP project that analyzes Twitter data to classify sentiments as positive, negative, or neutral using machine learning. Includes data preprocessing, feature extraction, and model evaluation.",
    technologies: ["Python", "NLTK", "Scikit-learn", "Pandas", "Matplotlib"],
    skills: ["NLP", "Text Classification", "Machine Learning", "Data Preprocessing"],
    difficulty: "Advanced",
    outcome: "A sentiment classification ML model",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop",
  },
  {
    id: "house-price-prediction",
    title: "House Price Prediction Model",
    description:
      "A machine learning project predicting house prices based on features like location, size, amenities, and market trends. Uses regression algorithms with feature engineering and model optimization.",
    technologies: ["Python", "Scikit-learn", "Pandas", "NumPy", "Seaborn"],
    skills: ["Regression Analysis", "Feature Engineering", "Model Tuning", "EDA"],
    difficulty: "Advanced",
    outcome: "An accurate price prediction system",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
  },
  {
    id: "customer-churn",
    title: "Customer Churn Prediction",
    description:
      "A classification model to predict customer churn for a telecom company. Includes exploratory data analysis, feature selection, model comparison, and actionable business recommendations.",
    technologies: ["Python", "XGBoost", "Pandas", "Scikit-learn", "Plotly"],
    skills: ["Classification", "Business Analytics", "Model Interpretation", "Data Science"],
    difficulty: "Advanced",
    outcome: "A churn prediction and analysis system",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop",
  },
  {
    id: "dating-app",
    title: "AI Dating Match Analysis",
    description:
      "AI-powered dating match analysis platform that predicts compatibility using machine learning and enhances results with intelligent explanations via LLM integration.",
    technologies: ["Python", "Streamlit", "Pandas", "Random Forest", "AI/ML"],
    skills: ["Machine Learning", "Data Analysis", "AI Integration", "Full ML Pipeline"],
    difficulty: "Advanced",
    outcome: "A deployed ML-powered compatibility system",
    image: "https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?w=600&h=400&fit=crop",
  },
  {
    id: "ecommerce-dashboard",
    title: "E-Commerce Analytics Dashboard",
    description:
      "Power BI dashboard tracking e-commerce KPIs including revenue, conversion rates, customer acquisition cost, product performance, and seasonal trends with interactive filters.",
    technologies: ["Power BI", "SQL", "DAX", "Azure"],
    skills: ["E-commerce Analytics", "KPI Tracking", "Data Modeling", "Business Intelligence"],
    difficulty: "Intermediate",
    outcome: "A complete e-commerce reporting solution",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
  },
  {
    id: "image-classification",
    title: "Image Classification with CNN",
    description:
      "A deep learning project using Convolutional Neural Networks to classify images. Trained on custom dataset with data augmentation, transfer learning, and model optimization techniques.",
    technologies: ["Python", "TensorFlow", "Keras", "OpenCV", "NumPy"],
    skills: ["Deep Learning", "CNN", "Transfer Learning", "Image Processing"],
    difficulty: "Advanced",
    outcome: "A trained image classification model",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop",
  },
  {
    id: "job-portal",
    title: "Job Portal Platform",
    description:
      "A dynamic job portal with admin dashboard for posting internships. Features JWT authentication, secure password hashing, job applications, and user management.",
    technologies: ["React", "Node.js", "MongoDB", "JWT", "MUI"],
    skills: ["MERN Stack", "Authentication", "REST APIs", "Security"],
    difficulty: "Advanced",
    outcome: "A secure job application platform",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&h=400&fit=crop",
  },
] as const;

// Learning Journey Steps
export const learningJourneySteps = [
  {
    step: 1,
    title: "Choose Your Learning Path",
    description: "Select a course or program that aligns with your career goals and current skill level.",
  },
  {
    step: 2,
    title: "Learn Core Concepts",
    description: "Master fundamental concepts through structured lessons, video content, and reading materials.",
  },
  {
    step: 3,
    title: "Practice Through Assignments",
    description: "Reinforce your learning with hands-on coding assignments and practical exercises.",
  },
  {
    step: 4,
    title: "Build Real-World Projects",
    description: "Apply your skills by building portfolio-worthy projects that solve real problems.",
  },
  {
    step: 5,
    title: "Get Mentor Feedback",
    description: "Receive personalized feedback and guidance from experienced mentors on your work.",
  },
  {
    step: 6,
    title: "Prepare for Industry Opportunities",
    description: "Get ready for job interviews, build your portfolio, and connect with industry opportunities.",
  },
] as const;

// Why Choose Mahak Yadav Features
export const whyChooseFeatures = [
  {
    title: "Practical, Hands-on Learning",
    description: "Learn by doing with real coding exercises, projects, and practical assignments that build actual skills.",
    icon: "Code2",
  },
  {
    title: "Industry-Relevant Curriculum",
    description: "Curriculum designed based on current industry requirements and in-demand technologies.",
    icon: "Target",
  },
  {
    title: "Personalized Mentorship",
    description: "Get guidance from experienced mentors who understand your learning goals and challenges.",
    icon: "UserCheck",
  },
  {
    title: "Live Interactive Sessions",
    description: "Engage in live sessions where you can ask questions, discuss concepts, and learn collaboratively.",
    icon: "Video",
  },
  {
    title: "Real-World Projects",
    description: "Build portfolio-worthy projects that demonstrate your skills to potential employers.",
    icon: "FolderGit2",
  },
  {
    title: "Continuous Learning Support",
    description: "Access to learning resources, community support, and ongoing guidance throughout your journey.",
    icon: "HeartHandshake",
  },
] as const;

// Pricing Plans
export const pricingPlans = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for self-paced learners",
    features: [
      "Individual learning path",
      "Structured curriculum",
      "Practice assignments",
      "Learning resources",
      "Community access",
    ],
    cta: "Contact for Pricing",
    highlighted: false,
  },
  {
    id: "professional",
    name: "Professional",
    description: "For serious skill development",
    features: [
      "Everything in Starter",
      "Live interactive sessions",
      "Guided projects",
      "Mentor support",
      "Code reviews",
      "Certificate of completion",
    ],
    cta: "Contact for Pricing",
    highlighted: true,
  },
  {
    id: "premium",
    name: "Premium Mentorship",
    description: "Comprehensive career transformation",
    features: [
      "Everything in Professional",
      "One-to-one mentoring",
      "Personalized learning roadmap",
      "Project reviews",
      "Career preparation guidance",
      "Interview preparation",
      "Resume review",
    ],
    cta: "Contact for Pricing",
    highlighted: false,
  },
] as const;

// Corporate Training Services
export const corporateServices = [
  {
    title: "Custom Technical Training",
    description: "Tailored training programs designed to meet your organization's specific technology needs and goals.",
    icon: "Settings",
  },
  {
    title: "AI and Generative AI Workshops",
    description: "Hands-on workshops on AI, machine learning, and generative AI tools for business applications.",
    icon: "Brain",
  },
  {
    title: "Full Stack Development Training",
    description: "Comprehensive training on modern web development technologies and best practices.",
    icon: "Layers",
  },
  {
    title: "Data Science and Analytics",
    description: "Training on data analysis, visualization, and machine learning for data-driven decision making.",
    icon: "BarChart3",
  },
  {
    title: "Python and Automation",
    description: "Python programming and automation training to improve productivity and efficiency.",
    icon: "Cog",
  },
  {
    title: "Employee Upskilling Programs",
    description: "Structured programs to help your team stay current with evolving technologies.",
    icon: "GraduationCap",
  },
] as const;

// Trust Indicators
export const trustIndicators = [
  { label: "Industry-Oriented Curriculum", icon: "BookOpen" },
  { label: "Hands-on Learning", icon: "Laptop" },
  { label: "Real-World Projects", icon: "FolderGit2" },
  { label: "Career-Focused Mentorship", icon: "Users" },
] as const;

// Values
export const values = [
  {
    title: "Practical Learning",
    description: "We believe in learning by doing. Every concept is reinforced with hands-on practice.",
  },
  {
    title: "Industry Relevance",
    description: "Our curriculum is designed based on what the industry actually needs.",
  },
  {
    title: "Continuous Improvement",
    description: "We constantly update our content to keep pace with evolving technologies.",
  },
  {
    title: "Personalized Mentorship",
    description: "Every learner gets guidance tailored to their goals and learning pace.",
  },
  {
    title: "Career Development",
    description: "We focus not just on skills, but on preparing you for real career opportunities.",
  },
] as const;
