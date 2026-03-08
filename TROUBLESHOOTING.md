# POS System - Troubleshooting Guide

## Current Issues & Fixes

### Issue 1: Frontend - Missing Dependencies

**Error:** `Cannot find module 'js-tokens'` or `Cannot find module '@apideck/better-ajv-errors'`

**Cause:** Incomplete npm installation in client folder

**Fix:**
```cmd
Double-click: COMPLETE-FIX.bat
```

This will:
1. Delete corrupted node_modules
2. Clean npm cache
3. Reinstall all dependencies fresh

**Manual Fix:**
```cmd
cd client
rmdir /s /q node_modules
del package-lock.json
npm cache clean --force
npm install
cd ..
```

---

### Issue 2: Backend - Router Error

**Error:** `TypeError: Router.use() requires a middleware function but got a Object`

**Cause:** Products route file returning empty object due to Node.js module caching

**Fix:** The products.js file has been recreated. If error persists:

1. Close all Node processes
2. Delete the file: `server/routes/products.js`
3. The system will use a simplified version

**Verification:**
```cmd
node -e "const r = require('./server/routes/products'); console.log(typeof r);"
```
Should output: `function`

---

## Step-by-Step Recovery

### Option A: Complete Fresh Install (Recommended)

1. **Stop all running servers** (close terminal windows)

2. **Run the fix script:**
   ```cmd
   Double-click: COMPLETE-FIX.bat
   ```
   Wait 5-10 minutes for installation

3. **Seed the database** (first time only):
   ```cmd
   Double-click: seed.bat
   ```

4. **Start the application:**
   ```cmd
   Double-click: SIMPLE-START.bat
   ```

### Option B: Manual Fix

1. **Fix Frontend:**
   ```cmd
   cd pos-system\client
   rmdir /s /q node_modules
   npm install
   cd ..
   ```

2. **Verify Backend:**
   ```cmd
   node server/index.js
   ```
   Should see: "Server running on port 5000" and "MongoDB connected"

3. **Start Frontend:**
   ```cmd
   cd client
   npm start
   ```

---

## Common Errors

### "MongoDB connection error"
- **Fix:** Start MongoDB first
  ```cmd
  mongod
  ```

### "Port 5000 already in use"
- **Fix:** Kill existing Node processes
  ```cmd
  taskkill /F /IM node.exe
  ```

### "ENOENT: no such file or directory"
- **Fix:** Make sure you're in the pos-system folder
  ```cmd
  cd pos-system
  ```

### PowerShell Script Execution Disabled
- **Fix:** Use batch (.bat) files instead of npm commands directly
- Or enable scripts:
  ```powershell
  Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
  ```

---

## Verification Checklist

Before running the app, verify:

- [ ] MongoDB is installed and running (`mongod --version`)
- [ ] Node.js is installed (`node --version`)
- [ ] Backend dependencies installed (pos-system/node_modules exists)
- [ ] Frontend dependencies installed (pos-system/client/node_modules exists)
- [ ] .env file exists in pos-system folder
- [ ] Database is seeded (run seed.bat once)

---

## Quick Test

Test if everything is working:

```cmd
# Test backend
cd pos-system
node server/index.js
# Should see: "Server running on port 5000"
# Press Ctrl+C to stop

# Test frontend
cd client
npm start
# Should open browser to localhost:3000
```

---

## Still Having Issues?

1. Delete everything and start fresh:
   ```cmd
   cd ..
   rmdir /s /q pos-system
   ```
   Then recreate the project

2. Check Node.js version:
   ```cmd
   node --version
   ```
   Should be v14 or higher

3. Check npm version:
   ```cmd
   npm --version
   ```
   Should be v6 or higher

---

## Success Indicators

You'll know it's working when:

✓ Backend terminal shows: "Server running on port 5000" and "MongoDB connected"
✓ Frontend terminal shows: "webpack compiled successfully"
✓ Browser opens to http://localhost:3000
✓ You see the login page
✓ You can login with admin@pos.com / admin123

---

## Need Help?

Check these files for more info:
- README.md - Project overview
- SETUP-GUIDE.md - Detailed setup instructions
- QUICK-START.txt - Quick reference guide
