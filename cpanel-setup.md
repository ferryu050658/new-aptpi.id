# Setup cPanel untuk APTPI dengan Node.js

## Langkah-langkah Setup di cPanel

### 1. Verifikasi Node.js Support
Pastikan hosting cPanel Anda mendukung Node.js:
- Login ke cPanel
- Cari "Node.js App" atau "Node.js Selector"
- Jika tidak ada, hubungi hosting provider

### 2. Upload Files
1. Compress semua file project menjadi ZIP
2. Upload ke cPanel File Manager
3. Extract ke folder di luar public_html (misal: `aptpi-app`)

### 3. Setup Node.js Application
1. Buka "Node.js App" di cPanel
2. Klik "Create Application"
3. Isi form:
   ```
   Node.js Version: 18.x (atau terbaru)
   Application Mode: Production
   Application Root: /home/username/aptpi-app
   Application URL: yourdomain.com
   Application Startup File: server.js
   ```

### 4. Environment Variables
Tambahkan environment variables di Node.js App:
```
DB_HOST=localhost
DB_USER=username_dbname
DB_PASSWORD=your_password
DB_NAME=username_dbname
GEMINI_API_KEY=your_gemini_key
JWT_SECRET=your_jwt_secret
NODE_ENV=production
PORT=3000
```

### 5. Install Dependencies
1. Buka Terminal di cPanel
2. Navigate ke folder app:
   ```bash
   cd /home/username/aptpi-app
   ```
3. Install dependencies:
   ```bash
   npm install
   npm run build
   ```

### 6. Database Setup
1. Buka "MySQL Databases"
2. Create database: `username_aptpi`
3. Create user dengan full privileges
4. Import schema dari `src/lib/schema.sql`

### 7. Start Application
1. Kembali ke Node.js App
2. Klik "Start" pada aplikasi
3. Test di browser: `https://yourdomain.com`

## Troubleshooting

### Jika AI Assistant Tidak Berfungsi:
1. Cek Gemini API key di environment variables
2. Test endpoint: `/api/health`
3. Lihat error logs di cPanel

### Jika Database Error:
1. Verify database credentials
2. Test connection di Terminal:
   ```bash
   mysql -h localhost -u username -p
   ```

### Jika Memory Error:
- Upgrade hosting plan
- Monitor resource usage di cPanel

## Testing Checklist
- [ ] Website loading
- [ ] Database connection (`/api/health`)
- [ ] AI Assistant responding
- [ ] Email functionality
- [ ] File uploads working
- [ ] SSL certificate active

## Maintenance
- Monitor error logs weekly
- Update dependencies monthly
- Backup database weekly
- Check AI API quota monthly