# Membuat APK MitraArja

## Cara 1 – Otomatis via GitHub (paling mudah, tanpa install apa pun)
1. Upload seluruh isi folder ini ke repository GitHub (branch `main`).
2. Buka tab **Actions** → workflow **Build Android APK** → tunggu ±5–8 menit (atau klik *Run workflow*).
3. Buka run yang selesai → bagian **Artifacts** → unduh **MitraArja-APK** → ekstrak → `MitraArja.apk`.
4. Kirim ke HP, aktifkan "Install dari sumber tidak dikenal", lalu install.

## Cara 2 – Di komputer sendiri
Syarat: Node 22, JDK 21, Android Studio (Android SDK).
```
npm install
npm run build
npm run android:init     # sekali saja: buat folder android + ikon
npm run android:apk      # hasil: android/app/build/outputs/apk/debug/app-debug.apk
```

## Ikon
Sumber ikon ada di `assets/` (icon-only, icon-foreground, icon-background, splash).
Ganti file tersebut lalu jalankan `npx capacitor-assets generate --android` untuk memperbarui.

## Catatan
- APK yang dihasilkan adalah **debug** (bisa langsung diinstall). Untuk Google Play perlu APK/AAB *release* yang ditandatangani.
- Aplikasi membutuhkan internet untuk memuat font Google.
