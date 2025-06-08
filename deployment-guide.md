# Panduan Deployment APTPI ke cPanel dengan Node.js

## ⚠️ PENTING: Fitur AI Memerlukan Node.js Runtime

Karena aplikasi ini menggunakan fitur AI (Gemini), **TIDAK BISA** menggunakan static export. Anda HARUS menggunakan cPanel yang mendukung Node.js applications.

## Persyaratan cPanel

1. **Node.js Support**: cPanel harus mendukung Node.js (versi 18+)
2. **Memory**: Minimal 512MB RAM
3. **Storage**: Minimal 1GB space
4. **Database**: MySQL/MariaDB access

## Persiapan Environment

### 1. Environment Variables (.env.local)
```env
# Database Configuration
DB_HOST=localhost
DB_USER=cpanel_username_dbname
DB_PASSWORD=your_database_password
DB_NAME=cpanel_username_dbname

# SMTP Configuration
SMTP_HOST=mail.yourdomain.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=noreply@yourdomain.com
SMTP_PASS=your_email_password
SMTP_FROM=APTPI <noreply@yourdomain.com>

# Application Configuration
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXT_PUBLIC_APP_NAME=APTPI - Asosiasi Pengembang Teknologi Pembelajaran Indonesia

# JWT Secret
JWT_SECRET=your_very_secure_random_string_here

# ⭐ GEMINI AI - WAJIB untuk fitur AI Assistant
GEMINI_API_KEY=your_gemini_api_key_here

# Node.js Configuration
NODE_ENV=production
PORT=3000
```

### 2. Mendapatkan Gemini API Key
1. Kunjungi [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Login dengan Google Account
3. Klik "Create API Key"
4. Copy API key dan masukkan ke environment variables

## Deployment ke cPanel Node.js

### Step 1: Persiapan Files
1. Upload semua file project ke folder di luar `public_html` (misal: `aptpi-app`)
2. Struktur folder:
```
/home/username/aptpi-app/
├── src/
├── public/
├── package.json
├── server.js
├── next.config.ts
├── .env.local
└── ...
```

### Step 2: Setup Node.js App di cPanel
1. Login ke cPanel
2. Cari "Node.js App" atau "Node.js Selector"
3. Klik "Create Application"
4. Konfigurasi:
   - **Node.js Version**: 18.x atau lebih baru
   - **Application Mode**: Production
   - **Application Root**: `/home/username/aptpi-app`
   - **Application URL**: `yourdomain.com` atau subdomain
   - **Application Startup File**: `server.js`
   - **Environment Variables**: Tambahkan semua dari .env.local

### Step 3: Install Dependencies
1. Buka Terminal di cPanel (atau SSH)
2. Navigate ke folder aplikasi:
```bash
cd /home/username/aptpi-app
```
3. Install dependencies:
```bash
npm install
```
4. Build aplikasi:
```bash
npm run build
```

### Step 4: Database Setup
1. Buka "MySQL Databases" di cPanel
2. Buat database baru
3. Buat user database dengan full privileges
4. Import schema dari `src/lib/schema.sql`
5. Update environment variables dengan credentials database

### Step 5: Start Application
1. Kembali ke Node.js App di cPanel
2. Klik "Start" pada aplikasi Anda
3. Aplikasi akan berjalan di URL yang dikonfigurasi

## Testing Fitur AI

### 1. Test Health Check
Akses: `https://yourdomain.com/api/health`
Response yang diharapkan:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "database": "connected"
}
```

### 2. Test AI Assistant
1. Buka website
2. Klik tombol AI Assistant (bot icon) di kanan bawah
3. Ketik pertanyaan tentang teknologi pendidikan
4. Pastikan mendapat response dari AI

## Troubleshooting

### AI Assistant Tidak Berfungsi
1. **Cek Gemini API Key**:
   - Pastikan API key valid
   - Cek quota API di Google AI Studio
   - Pastikan environment variable `GEMINI_API_KEY` ter-set

2. **Cek Network**:
   - Pastikan server bisa akses internet
   - Cek firewall tidak memblokir Google AI API

3. **Cek Logs**:
   - Lihat error logs di cPanel
   - Cek browser console untuk client-side errors

### Database Connection Issues
```bash
# Test koneksi database
mysql -h localhost -u username -p database_name
```

### Memory Issues
- Upgrade hosting plan jika memory tidak cukup
- Monitor usage di cPanel Resource Usage

### Port Issues
- Pastikan port 3000 tidak bentrok
- Ubah PORT di environment variables jika perlu

## Monitoring & Maintenance

### 1. Health Monitoring
Setup monitoring untuk endpoint `/api/health`:
- Status: 200 = healthy
- Status: 500 = ada masalah

### 2. AI Usage Monitoring
- Monitor quota Gemini API di Google AI Studio
- Setup alerts jika mendekati limit

### 3. Regular Maintenance
- Update dependencies bulanan
- Backup database mingguan
- Monitor error logs harian

## Performance Optimization

### 1. Caching
```javascript
// Tambahkan di next.config.ts
const nextConfig = {
  // ... existing config
  experimental: {
    serverComponentsExternalPackages: ['@genkit-ai/googleai']
  }
}
```

### 2. Memory Management
- Monitor memory usage aplikasi Node.js
- Restart aplikasi jika memory leak

### 3. Database Optimization
- Index pada kolom yang sering di-query
- Regular database cleanup

## Security Checklist

- [ ] Environment variables aman (tidak di commit ke git)
- [ ] Database credentials kuat
- [ ] SSL certificate aktif
- [ ] Firewall configured
- [ ] Regular security updates
- [ ] API key rotation schedule

## Support & Resources

### Jika Mengalami Masalah:
1. Cek error logs di cPanel
2. Test endpoint `/api/health`
3. Verify environment variables
4. Check Node.js app status di cPanel

### Useful Commands:
```bash
# Restart Node.js app
pm2 restart all

# Check app status
pm2 status

# View logs
pm2 logs

# Monitor resources
pm2 monit
```

### Contact Support:
- cPanel hosting provider untuk Node.js issues
- Google AI Studio untuk Gemini API issues
- GitHub issues untuk aplikasi bugs