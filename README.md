# Mkhedmin.ma - Moroccan Freelancer Platform

**Tagline:** Find Moroccan digital freelancers instantly — no signup required.

A modern, Morocco-first freelancer platform inspired by LinkedIn's depth and Airbnb's crisp filters, built with Node.js, Express, MongoDB, Next.js, and TypeScript.

## 🚀 Features

### For Clients (Guests)
- **Zero-friction discovery**: Search and contact freelancers without creating an account
- **Advanced search & filters**: Category, skills, location, rates, availability
- **Instant contact**: WhatsApp, phone, or contact form with OTP verification
- **Morocco-specific**: Moroccan cities, phone formats, MAD currency

### For Freelancers
- **Quick profile creation**: Complete profile setup in under 5 minutes
- **Portfolio showcase**: Projects, testimonials, skills, and experience
- **Lead management**: Track inquiries, response times, and conversions
- **Analytics dashboard**: Profile views, contact clicks, and performance metrics
- **SEO optimization**: Custom slugs, meta descriptions, and keywords

### Platform Features
- **Multi-language support**: Arabic (RTL), French, English
- **Mobile-first design**: Responsive and optimized for all devices
- **Real-time search**: Fast, indexed search with autocomplete
- **Security**: Rate limiting, input validation, JWT authentication
- **Performance**: Optimized queries, caching, and lazy loading

## 🛠 Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** authentication with refresh tokens
- **Joi** validation
- **Rate limiting** and security middleware
- **Cloudinary** for image uploads
- **Nodemailer** for email notifications
- **Twilio** for SMS/OTP (optional)

### Frontend
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** with custom design system
- **React Query** for data fetching and caching
- **Zustand** for state management
- **React Hook Form** with Zod validation
- **Framer Motion** for animations
- **Headless UI** for accessible components

## 📁 Project Structure

```
mkhedmin-ma/
├── backend/                 # Node.js/Express API
│   ├── src/
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Auth, validation, security
│   │   └── index.js        # Server entry point
│   ├── .env.example        # Environment variables template
│   └── package.json
├── frontend/               # Next.js application
│   ├── src/
│   │   ├── app/           # App Router pages
│   │   ├── components/    # React components
│   │   ├── lib/          # Utilities and API client
│   │   ├── types/        # TypeScript types
│   │   └── stores/       # Zustand stores
│   ├── tailwind.config.ts # Tailwind configuration
│   └── package.json
├── package.json           # Root package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- MongoDB (local or MongoDB Atlas)
- Git

### 1. Clone the Repository
```bash
git clone <repository-url>
cd mkhedmin-ma
```

### 2. Install Dependencies
```bash
# Install all dependencies (root, backend, frontend)
npm run install:all
```

### 3. Environment Setup

#### Backend (.env)
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` with your configuration:
```env
# Database
MONGODB_URI=mongodb://localhost:27017/mkhedmin-ma

# JWT Secrets (generate strong secrets)
JWT_SECRET=your-super-secret-jwt-key-here
JWT_REFRESH_SECRET=your-super-secret-refresh-jwt-key-here

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Optional: Email, SMS, File Upload
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

#### Frontend (.env.local)
```bash
cd frontend
echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api" > .env.local
```

### 4. Start Development Servers
```bash
# From root directory - starts both backend and frontend
npm run dev

# Or start individually:
npm run backend:dev    # Backend on http://localhost:5000
npm run frontend:dev   # Frontend on http://localhost:3000
```

### 5. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **API Documentation**: http://localhost:5000/api

## 📊 API Endpoints

### Public Endpoints
- `GET /api/freelancers` - Search freelancers with filters
- `GET /api/freelancers/:slug` - Get freelancer profile
- `GET /api/freelancers/featured` - Get featured freelancers
- `POST /api/leads` - Create contact request
- `GET /api/leads/verify/:token` - Verify email

### Authentication
- `POST /api/auth/register` - Register new freelancer
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/me` - Get current user

### Freelancer (Protected)
- `POST /api/freelancers` - Create profile
- `PUT /api/freelancers/:id` - Update profile
- `POST /api/freelancers/:id/portfolio` - Add portfolio item
- `PATCH /api/freelancers/:id/visibility` - Update visibility

### Leads (Protected)
- `GET /api/leads` - Get freelancer's leads
- `GET /api/leads/stats` - Get lead statistics
- `PATCH /api/leads/:id/status` - Update lead status
- `POST /api/leads/:id/notes` - Add note to lead

## 🎨 Design System

The project uses a comprehensive design system built with Tailwind CSS:

### Colors
- **Brand**: Sky blue (#0ea5e9) for primary actions
- **Accent**: Orange (#f97316) for highlights
- **Semantic**: Success, warning, error colors
- **Grays**: 11-step gray scale for text and backgrounds

### Typography
- **Latin**: Inter for UI, Poppins for display
- **Arabic**: Cairo for Arabic text with RTL support
- **Scale**: 4pt grid system (12px to 40px)

### Components
- **Buttons**: Primary, secondary, accent, outline, ghost variants
- **Forms**: Consistent input styling with error states
- **Cards**: Hover effects and consistent spacing
- **Animations**: Subtle transitions and micro-interactions

## 🌍 Morocco-Specific Features

### Localization
- **Languages**: Arabic (RTL), French (default), English
- **Currency**: Moroccan Dirham (MAD) formatting
- **Phone**: Moroccan phone number validation (+212)
- **Regions**: 12 official Moroccan regions
- **Cities**: Major Moroccan cities with autocomplete

### Cultural Considerations
- **WhatsApp Integration**: Primary communication method
- **Cash-friendly**: "Contact for rate" option
- **Trust indicators**: Verification badges, response time
- **Local holidays**: Ramadan mode, holiday awareness

## 🔒 Security Features

- **Rate limiting**: API endpoints protected against abuse
- **Input validation**: Server-side validation with Joi
- **Authentication**: JWT with refresh token rotation
- **CORS**: Configured for specific origins
- **Helmet**: Security headers enabled
- **XSS Protection**: Input sanitization
- **SQL Injection**: MongoDB injection prevention

## 📱 Performance Optimizations

### Backend
- **Database indexing**: Optimized queries for search
- **Caching**: Response caching for static data
- **Connection pooling**: MongoDB connection optimization
- **Compression**: Gzip response compression

### Frontend
- **Code splitting**: Route-based code splitting
- **Image optimization**: Next.js Image component
- **Bundle analysis**: Webpack bundle analyzer
- **Lazy loading**: Components and images
- **Service Worker**: Offline functionality (optional)

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test

# E2E tests
npm run test:e2e
```

## 🚀 Deployment

### Backend (Node.js)
```bash
cd backend
npm run build
npm start
```

### Frontend (Next.js)
```bash
cd frontend
npm run build
npm start
```

### Docker (Optional)
```bash
docker-compose up -d
```

### Environment Variables for Production
- Set `NODE_ENV=production`
- Use strong JWT secrets
- Configure MongoDB Atlas
- Set up Cloudinary for file uploads
- Configure email service (SendGrid, etc.)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the `/docs` folder for detailed guides
- **Issues**: Report bugs on GitHub Issues
- **Discussions**: Join GitHub Discussions for questions
- **Email**: support@mkhedmin.ma

## 🎯 Roadmap

### v1.0 (Current)
- ✅ Core freelancer profiles
- ✅ Advanced search and filters
- ✅ Contact system with leads
- ✅ Multi-language support
- ✅ Mobile-responsive design

### v1.1 (Next)
- 🔄 Reviews and ratings system
- 🔄 Saved freelancer lists
- 🔄 Email notifications
- 🔄 Advanced analytics
- 🔄 Premium features

### v2.0 (Future)
- 📅 Project management system
- 📅 Integrated messaging
- 📅 Payment processing
- 📅 AI-powered matching
- 📅 Mobile app

---

**Made with ❤️ for the Moroccan tech community**