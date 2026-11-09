"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, Bot } from "lucide-react";

interface Message {
  id: string;
  type: "bot" | "user";
  text: string;
  options?: string[];
}

// FAQ Knowledge Base
const faqResponses: Record<string, string> = {
  // Courses
  "courses": "I offer courses in:\n\n• **Python Programming** (8 weeks)\n• **Data Science & Analytics** (12 weeks)\n• **AI & Machine Learning** (12 weeks)\n• **Full Stack Development** (12 weeks)\n• **Power BI & Data Visualization** (8 weeks)\n• **Interview Preparation** (4 weeks)\n\nWhich course interests you?",
  "python": "The **Python Programming** course is perfect for beginners! It covers fundamentals, OOP, file handling, and real projects. Duration: 8 weeks. Would you like to know about the curriculum or pricing?",
  "data science": "The **Data Science & Analytics** course covers Python, Pandas, NumPy, data visualization, statistics, and real-world projects. Duration: 12 weeks. Great for aspiring data analysts!",
  "machine learning": "The **AI & Machine Learning** course covers supervised/unsupervised learning, neural networks, deep learning with TensorFlow/PyTorch, and hands-on projects. Duration: 12 weeks.",
  "full stack": "The **Full Stack Development** course covers HTML, CSS, JavaScript, React, Node.js, databases, and deployment. You'll build complete web applications! Duration: 12 weeks.",
  "power bi": "The **Power BI** course teaches data visualization, dashboard creation, DAX formulas, and connecting to various data sources. Perfect for business analysts! Duration: 8 weeks.",
  
  // Pricing
  "price": "Course fees vary based on the program:\n\n• 1:1 Personal Training: ₹15,000 - ₹25,000\n• Small Batch (3-5 students): ₹8,000 - ₹15,000\n• Corporate Training: Custom pricing\n\nWould you like to discuss payment options?",
  "fee": "Course fees vary based on the program:\n\n• 1:1 Personal Training: ₹15,000 - ₹25,000\n• Small Batch (3-5 students): ₹8,000 - ₹15,000\n• Corporate Training: Custom pricing\n\nWould you like to discuss payment options?",
  "cost": "Course fees vary based on the program:\n\n• 1:1 Personal Training: ₹15,000 - ₹25,000\n• Small Batch (3-5 students): ₹8,000 - ₹15,000\n• Corporate Training: Custom pricing\n\nWould you like to discuss payment options?",
  "payment": "I offer flexible payment options:\n\n• Full payment upfront (5% discount)\n• 2 installments\n• Monthly EMI available\n\nNo hidden charges. Certificate included!",
  
  // Duration & Schedule
  "duration": "Course durations:\n\n• Python: 8 weeks\n• Data Science: 12 weeks\n• AI/ML: 12 weeks\n• Full Stack: 12 weeks\n• Power BI: 8 weeks\n• Interview Prep: 4 weeks\n\nClasses are 1-2 hours, 3-4 times per week.",
  "timing": "Classes are flexible! I offer:\n\n• Morning batches (9 AM - 11 AM)\n• Evening batches (6 PM - 8 PM)\n• Weekend batches (Saturday/Sunday)\n\nWe can also customize timing for 1:1 sessions.",
  "schedule": "Classes are flexible! I offer:\n\n• Morning batches (9 AM - 11 AM)\n• Evening batches (6 PM - 8 PM)\n• Weekend batches (Saturday/Sunday)\n\nWe can also customize timing for 1:1 sessions.",
  
  // About Mentor
  "about": "I'm **Mahak Yadav**, a tech mentor with 2+ years of industry experience. I've trained 400+ students in Python, Data Science, AI/ML, and Full Stack Development. My teaching approach is hands-on and project-based!",
  "experience": "I have 2+ years of industry experience and have trained 400+ students. I've worked with companies and conducted corporate training programs. My students have landed jobs at top tech companies!",
  "mentor": "I'm **Mahak Yadav**, a tech mentor with 2+ years of industry experience. I've trained 400+ students in Python, Data Science, AI/ML, and Full Stack Development. My teaching approach is hands-on and project-based!",
  
  // Learning
  "beginner": "Absolutely! Most of my courses are beginner-friendly. I start from the basics and gradually move to advanced topics. No prior coding experience needed for Python and Full Stack courses!",
  "prerequisite": "For most courses, no prerequisites! Just bring:\n\n• A laptop\n• Willingness to learn\n• 1-2 hours daily for practice\n\nFor AI/ML course, basic Python knowledge helps but isn't mandatory.",
  "certificate": "Yes! You'll receive a **completion certificate** after finishing the course. It's recognized and can be added to your LinkedIn profile and resume.",
  "job": "While I don't guarantee placement, I provide:\n\n• Resume building\n• Interview preparation\n• LinkedIn optimization\n• Project portfolio\n• Job referrals when possible\n\nMany of my students have landed great jobs!",
  "placement": "While I don't guarantee placement, I provide:\n\n• Resume building\n• Interview preparation\n• LinkedIn optimization\n• Project portfolio\n• Job referrals when possible\n\nMany of my students have landed great jobs!",
  
  // Contact
  "contact": "You can reach me via:\n\n📧 Email: ymahaky@gmail.com\n📱 WhatsApp: +91 98177 48915\n\nOr fill out the enquiry form and I'll get back within 24 hours!",
  "whatsapp": "You can WhatsApp me at **+91 98177 48915**. I typically respond within a few hours!",
  "call": "You can reach me at **+91 98177 48915** (WhatsApp preferred). Or book a free consultation call through the website!",
  
  // Batch
  "batch": "New batches start every month! Current upcoming batches:\n\n• Python: Starting soon\n• Data Science: Enrolling now\n• Full Stack: Limited seats\n\nWould you like to reserve a spot?",
  "enroll": "To enroll:\n\n1. Fill out the enquiry form\n2. We'll schedule a free consultation\n3. Choose your batch timing\n4. Make payment\n5. Start learning!\n\nShall I help you get started?",
  
  // Mode
  "online": "Yes! All courses are available **online** via Google Meet/Zoom. You can learn from anywhere! Recordings are provided for missed classes.",
  "offline": "Currently, I primarily offer **online training**. However, for corporate training or group sessions in Delhi NCR, offline options can be arranged.",
  "recording": "Yes! All live sessions are **recorded** and shared. So if you miss a class, you can catch up anytime. Recordings are available for 6 months after course completion.",
};

// Quick reply options for different contexts
const quickReplies = {
  initial: ["View Courses", "Pricing Info", "About Mentor", "Contact"],
  courses: ["Python", "Data Science", "AI/ML", "Full Stack", "Pricing"],
  pricing: ["Payment Options", "Book Free Call", "Enroll Now"],
  general: ["Courses", "Pricing", "Schedule", "Contact"],
};

function findBestResponse(input: string): string {
  const lowerInput = input.toLowerCase();
  
  for (const [key, response] of Object.entries(faqResponses)) {
    if (lowerInput.includes(key)) {
      return response;
    }
  }
  
  if (lowerInput.match(/^(hi|hello|hey|hii|hola|namaste)/)) {
    return "Hello! 👋 Welcome to Mahak Yadav's Training Portal!\n\nI'm here to help you with:\n• Course information\n• Pricing & schedules\n• Enrollment process\n\nWhat would you like to know?";
  }
  
  if (lowerInput.match(/(thank|thanks|thx)/)) {
    return "You're welcome! 😊 Is there anything else I can help you with? Feel free to ask about courses, pricing, or schedule a free consultation!";
  }
  
  return "I'd be happy to help! Here's what I can assist with:\n\n• **Courses** - Python, Data Science, AI/ML, Full Stack\n• **Pricing** - Fees and payment options\n• **Schedule** - Batch timings and duration\n• **Contact** - Get in touch with Mahak\n\nWhat would you like to know more about?";
}

function getQuickReplies(lastMessage: string): string[] {
  const lower = lastMessage.toLowerCase();
  if (lower.includes("course") || lower.includes("python") || lower.includes("data")) {
    return quickReplies.courses;
  }
  if (lower.includes("price") || lower.includes("fee") || lower.includes("cost")) {
    return quickReplies.pricing;
  }
  return quickReplies.general;
}

// Floating Robot Icon Component
function FloatingRobot({ onClick, isOpen }: { onClick: () => void; isOpen: boolean }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState({ x: 1, y: 1 });
  
  useEffect(() => {
    if (isOpen) return;
    
    const moveRobot = () => {
      setPosition(prev => {
        let newX = prev.x + direction.x * 2;
        let newY = prev.y + direction.y * 1.5;
        let newDirX = direction.x;
        let newDirY = direction.y;
        
        // Bounce off boundaries
        if (newX > 60 || newX < -60) {
          newDirX = -direction.x;
          newX = prev.x + newDirX * 2;
        }
        if (newY > 40 || newY < -40) {
          newDirY = -direction.y;
          newY = prev.y + newDirY * 1.5;
        }
        
        setDirection({ x: newDirX, y: newDirY });
        return { x: newX, y: newY };
      });
    };
    
    const interval = setInterval(moveRobot, 50);
    return () => clearInterval(interval);
  }, [isOpen, direction]);

  if (isOpen) return null;

  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 group"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-[#FF6B1A] rounded-full blur-xl opacity-40 group-hover:opacity-60 animate-pulse" />
      
      {/* Robot container */}
      <div 
        className="relative w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-300 bg-gradient-to-br from-[#FF6B1A] to-[#FFC83D] hover:scale-110"
        style={{ 
          boxShadow: "0 0 30px rgba(255, 107, 26, 0.5)",
        }}
      >
        {/* Custom Robot Face */}
        <div className="relative">
          {/* Robot head */}
          <div className="w-10 h-10 bg-white rounded-xl relative overflow-hidden border-2 border-[#140D08]">
            {/* Antenna */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1 h-3 bg-[#140D08] rounded-full">
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#FF6B1A] rounded-full animate-ping" />
            </div>
            
            {/* Eyes */}
            <div className="absolute top-2 left-0 right-0 flex justify-center gap-2">
              <div className="w-2.5 h-2.5 bg-[#140D08] rounded-full relative">
                <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white rounded-full" />
              </div>
              <div className="w-2.5 h-2.5 bg-[#140D08] rounded-full relative">
                <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white rounded-full" />
              </div>
            </div>
            
            {/* Mouth - animated */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-4 h-1.5 bg-[#FF6B1A] rounded-full animate-pulse" />
            
            {/* Cheeks */}
            <div className="absolute top-4 left-1 w-1.5 h-1 bg-[#FFC83D] rounded-full opacity-60" />
            <div className="absolute top-4 right-1 w-1.5 h-1 bg-[#FFC83D] rounded-full opacity-60" />
          </div>
        </div>
      </div>
      
      {/* Speech bubble */}
      <div className="absolute -top-12 right-0 bg-white px-3 py-1.5 rounded-xl shadow-lg border-2 border-[#140D08] whitespace-nowrap animate-bounce">
        <span className="text-xs font-bold text-[#140D08]">Need help? 💬</span>
        <div className="absolute -bottom-2 right-4 w-3 h-3 bg-white border-r-2 border-b-2 border-[#140D08] transform rotate-45" />
      </div>
      
      {/* Floating particles */}
      <div className="absolute -top-2 -left-2 w-2 h-2 bg-[#FFC83D] rounded-full animate-ping opacity-75" style={{ animationDuration: '2s' }} />
      <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-[#FF6B1A] rounded-full animate-ping opacity-75" style={{ animationDuration: '1.5s', animationDelay: '0.5s' }} />
      <div className="absolute top-1/2 -left-3 w-1 h-1 bg-[#FFC83D] rounded-full animate-ping opacity-50" style={{ animationDuration: '2.5s', animationDelay: '1s' }} />
    </button>
  );
}

const initialMessage: Message = {
  id: "1",
  type: "bot",
  text: "Hi there! 👋 I'm Mahak's AI assistant.\n\nI can help you with course information, pricing, schedules, and more!\n\nWhat would you like to know?",
  options: quickReplies.initial,
};

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Reset conversation when closing
  const handleClose = () => {
    setIsOpen(false);
    setMessages([initialMessage]);
    setInput("");
    setIsTyping(false);
  };

  const handleSend = (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      text: messageText,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = findBestResponse(messageText);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        text: response,
        options: getQuickReplies(response),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 800 + Math.random() * 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatText = (text: string) => {
    return text.split("\n").map((line, i) => {
      const formattedLine = line.replace(
        /\*\*([^*]+)\*\*/g,
        '<strong class="font-semibold text-[#140D08]">$1</strong>'
      );
      return (
        <span key={i}>
          <span dangerouslySetInnerHTML={{ __html: formattedLine }} />
          {i < text.split("\n").length - 1 && <br />}
        </span>
      );
    });
  };

  return (
    <>
      {/* Floating Robot Button */}
      <FloatingRobot onClick={() => setIsOpen(!isOpen)} isOpen={isOpen} />

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] bg-white rounded-2xl shadow-2xl border-2 border-[#140D08] overflow-hidden animate-in slide-in-from-bottom-5 duration-300"
          style={{ boxShadow: "8px 8px 0 #140D08" }}
        >
          {/* Header with X button */}
          <div className="bg-[#140D08] text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6B1A] to-[#FFC83D] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Mahak's AI Assistant</h3>
                  <p className="text-xs text-[#C9B9A8] flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    Online • Replies instantly
                  </p>
                </div>
              </div>
              {/* Close button */}
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full bg-[#2A1F1A] hover:bg-[#FF6B1A] flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="h-[350px] overflow-y-auto p-4 space-y-4 bg-[#FFF6EC]">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] ${
                    message.type === "user"
                      ? "bg-[#FF6B1A] text-white rounded-2xl rounded-br-md"
                      : "bg-white border border-[#E3CDB4] rounded-2xl rounded-bl-md"
                  } p-3 shadow-sm`}
                >
                  {message.type === "bot" && (
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 rounded-md bg-gradient-to-br from-[#FF6B1A] to-[#FFC83D] flex items-center justify-center">
                        <Bot className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-xs font-semibold text-[#FF6B1A]">
                        Assistant
                      </span>
                    </div>
                  )}
                  <p
                    className={`text-sm leading-relaxed ${
                      message.type === "user" ? "text-white" : "text-[#4A3626]"
                    }`}
                  >
                    {formatText(message.text)}
                  </p>
                  {message.options && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {message.options.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleSend(option)}
                          className="text-xs px-3 py-1.5 rounded-full bg-[#FFF6EC] border border-[#FF6B1A] text-[#FF6B1A] hover:bg-[#FF6B1A] hover:text-white transition-colors"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-[#E3CDB4] rounded-2xl rounded-bl-md p-3 shadow-sm">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#FF6B1A] animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-[#FF6B1A] animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-[#FF6B1A] animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-[#E3CDB4]">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your question..."
                className="flex-1 px-4 py-2.5 rounded-full bg-[#FFF6EC] border border-[#E3CDB4] text-sm text-[#140D08] placeholder-[#A89785] focus:outline-none focus:border-[#FF6B1A]"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className="w-10 h-10 rounded-full bg-[#FF6B1A] text-white flex items-center justify-center hover:bg-[#e55f15] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-center text-[#A89785] mt-2">
              For detailed enquiries, <a href="/contact" className="text-[#FF6B1A] hover:underline">fill out the form</a> or <a href="https://wa.me/919817748915" className="text-[#FF6B1A] hover:underline">WhatsApp us</a>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
