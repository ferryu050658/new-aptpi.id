# APTPI - Asosiasi Pengembang Teknologi Pembelajaran Indonesia

Website resmi APTPI yang dibangun dengan Next.js, TypeScript, dan Tailwind CSS dengan fitur AI Assistant menggunakan Google Gemini dan database MariaDB.

## 🚀 Quick Start

### Prasyarat
- Node.js 18+
- **MariaDB** (XAMPP recommended atau MariaDB standalone)
- Git
- Gemini API Key (untuk AI Assistant)

### Setup Development

1. **Clone Repository**
   ```bash
   git clone <repository-url>
   cd aptpi-website
   ```

2. **Check Requirements**
   ```bash
   node scripts/check-requirements.js
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Local Setup MariaDB Database**
   
   **XAMPP (Recommended):**
   ```bash
   # Start XAMPP dan aktifkan MariaDB
   # Buka http://localhost/phpmyadmin
   # Buat database: aptpi_local
   # Import: supabase/migrations/20250606161201_gentle_meadow.sql
   ```
   
   **MariaDB Standalone:**
   ```bash
   # Create database
   mariadb -u root -p -e "CREATE DATABASE aptpi_local;"
   
   # Import schema
   mariadb -u root -p aptpi_local < supabase/migrations/20250606161201_gentle_meadow.sql
   ```

5. **Configure Environment**
   ```bash
   # Update config.env dengan kredensial MariaDB Anda
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=your_mariadb_password
   DB_NAME=aptpi_local
   
   # Tambahkan Gemini API Key
   GEMINI_API_KEY=your_gemini_api_key
   ```

6. **Start Development**
   ```bash
   npm run dev
   ```

7. **Access Application**
   - Website: http://localhost:3000
   - Admin: http://localhost:3000/admin/login
   - Health: http://localhost:3000/api/health

### Login Admin Default
```
Username: aptpi_admin_2024
Password: admin123

Username: admin (legacy)
Password: admin123
```

## 🛠️ Development Tools

```bash
# Development workflow
npm run dev                    # Start dev server
npm run build                  # Build project
npm run start                  # Start production server
npm run typecheck              # Type checking
npm run lint                   # Linting

# Database management (MariaDB)
mariadb -u root -p aptpi_local < supabase/migrations/20250606161201_gentle_meadow.sql  # Reset DB
mariadb-dump -u root -p aptpi_local > backup_$(date +%Y%m%d).sql                      # Backup DB

# Health checks
curl http://localhost:3000/api/health  # Check MariaDB connection
```

## 📁 Project Structure

```
aptpi-website/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── admin/          # Admin dashboard
│   │   ├── api/            # API routes
│   │   ├── berita/         # News & articles
│   │   ├── forum/          # Forum pages
│   │   ├── keanggotaan/    # Membership pages
│   │   └── tentang-aptpi/  # About pages
│   ├── components/         # Reusable components
│   │   ├── ui/            # UI components (shadcn/ui)
│   │   ├── layout/        # Layout components
│   │   └── ai/            # AI Assistant components
│   ├── lib/               # Utilities & MariaDB connection
│   ├── types/             # TypeScript types
│   └── ai/                # AI/Genkit configuration
├── public/                # Static assets
├── supabase/             # Database migrations (MariaDB compatible)
├── scripts/              # Development scripts
├── .github/              # GitHub Actions
├── docs/                 # Documentation
└── config.env            # Environment configuration
```

## 🎯 Features

### Public Features
- **Homepage** - Landing page dengan informasi APTPI
- **Tentang APTPI** - Sejarah, visi/misi, struktur organisasi, AD/ART
- **Keanggotaan** - Jenis keanggotaan, manfaat, cara mendaftar
- **Berita & Artikel** - Sistem publikasi dengan kategori dan filter
- **Forum Diskusi** - Platform diskusi untuk anggota
- **Unduhan** - Repository file dan dokumen
- **AI Assistant** - Chatbot dengan Google Gemini
- **Kontak** - Informasi kontak dan lokasi

### Admin Features
- **Dashboard** - Overview statistik dan aktivitas
- **Kelola Anggota** - Verifikasi pendaftaran anggota
- **Kelola Konten** - CRUD berita, artikel, dan file unduhan
- **Moderasi Forum** - Moderasi post dan diskusi
- **Upload Manager** - Sistem upload file
- **User Management** - Kelola admin users dengan role-based access

### Technical Features
- **Responsive Design** - Mobile-first dengan Tailwind CSS
- **TypeScript** - Type safety dan better DX
- **MariaDB Integration** - Optimized connection pooling dan query handling
- **AI Integration** - Google Gemini untuk chatbot
- **File Upload** - Secure file upload system
- **Authentication** - JWT-based admin authentication
- **Email System** - Nodemailer untuk notifikasi
- **Health Monitoring** - Health check endpoints dengan MariaDB status
- **Error Handling** - Comprehensive error handling
- **Mock Data Fallback** - Graceful degradation

## 🔧 Configuration

### Environment Variables (config.env)
```env
# MariaDB Database
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=aptpi_local

# AI Assistant
GEMINI_API_KEY=your_gemini_api_key

# Application
NODE_ENV=development
PORT=3000
JWT_SECRET=your_jwt_secret
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### MariaDB Schema
Database schema tersedia di `supabase/migrations/20250606161201_gentle_meadow.sql` dengan tables:
- `admin_users` - Admin authentication dengan role-based access
- `member_registrations` - Member registration data
- `articles` - News and articles
- `download_files` - Downloadable files
- `forum_posts` - Forum discussions

## 🚀 Deployment

### Automated Deployment (GitHub Actions)
1. Setup GitHub Secrets untuk cPanel credentials
2. Ensure cPanel has MariaDB support
3. Push ke main branch
4. GitHub Actions akan otomatis deploy ke production

### Manual Deployment
```bash
# Build for production
npm run build

# Deploy to cPanel with MariaDB
npm run cpanel:deploy

# Monitor deployment
npm run cpanel:logs
```

## 🧪 Testing

```bash
# Type checking
npm run typecheck

# Linting
npm run lint

# Requirements check (including MariaDB)
node scripts/check-requirements.js

# Health check (MariaDB connection)
curl http://localhost:3000/api/health
```

## 📚 Documentation

- [Local Setup Guide](docs/LOCAL_SETUP.md) - Setup dengan MariaDB
- [Deployment Guide](docs/DEPLOYMENT.md) - Deploy dengan MariaDB
- [Admin Management](docs/ADMIN_MANAGEMENT.md) - Kelola admin users
- [API Documentation](docs/API.md)

## 🔒 Security

- Environment variables untuk sensitive data
- JWT authentication untuk admin dengan role-based access
- Input validation dan sanitization
- File upload restrictions
- SQL injection protection (MariaDB prepared statements)
- XSS protection
- Secure admin username conventions

## 🗄️ Database (MariaDB)

### Features
- **Connection Pooling** - Optimized untuk performance
- **Character Set** - UTF8MB4 untuk full Unicode support
- **Timezone** - WIB (+07:00) support
- **Error Handling** - Comprehensive MariaDB error handling
- **Health Monitoring** - Real-time connection status

### Management
```bash
# Connect to MariaDB
mariadb -u root -p

# Check version
mariadb --version

# Backup database
mariadb-dump -u root -p aptpi_local > backup.sql

# Restore database
mariadb -u root -p aptpi_local < backup.sql
```

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Make changes
4. Test dengan MariaDB
5. Run tests
6. Submit pull request

## 📞 Support

Jika mengalami masalah:
1. Check error logs di terminal
2. Verify MariaDB connection: `mariadb -u root -p`
3. Check environment variables di `config.env`
4. Test health endpoint: http://localhost:3000/api/health
5. Restart development server
6. Check MariaDB service status

### MariaDB Specific Issues
- **Connection refused**: `systemctl start mariadb` atau start XAMPP
- **Access denied**: Check credentials di `config.env`
- **Database not found**: Create database first
- **Port conflict**: Check if port 3306 is available

## 📄 License

Copyright © 2024 APTPI. All rights reserved.