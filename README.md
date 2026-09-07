# Zarxal Mall — Frontend

React 19 + Vite + Tailwind CSS. Mobile-first premium parfyumeriya do'kon interfeysi.

## 1. Lokal ishga tushirish

```bash
cd frontend
npm install
cp .env.example .env
# .env dagi VITE_API_URL ni backend manzilingizga moslang
npm run dev
```

Sayt: `http://localhost:5173`

## 2. Environment o'zgaruvchilari

| O'zgaruvchi | Tavsif |
|---|---|
| `VITE_API_URL` | Backend API bazaviy manzili, masalan `https://zarxal-api.onrender.com/api` |
| `VITE_SELLER_PHONE` | "Sotib olish" bosilganda ko'rsatiladigan sotuvchi telefon raqami |

Production URL kodga hardcode qilinmagan — hammasi shu o'zgaruvchilar orqali beriladi.

## 3. Netlify'ga deploy (bepul)

1. https://netlify.com — "Add new site" → "Import an existing project" → GitHub repo'ni ulang.
2. Base directory: `frontend`
3. Build command: `npm run build`
4. Publish directory: `frontend/dist`
5. Site settings → Environment variables bo'limiga `VITE_API_URL` va `VITE_SELLER_PHONE` ni qo'shing.
6. `frontend/public/_redirects` fayli allaqachon qo'shilgan — bu React Router'ning ichki sahifalarini (masalan `/perfume/123`) to'g'ri ishlashini ta'minlaydi.

## 4. Sahifalar

**Foydalanuvchi tomoni** (login talab qilinmaydi):
- `/` — bosh sahifa (hero, brendlar, kategoriyalar, atirlar grid)
- `/perfume/:id` — atir tafsilotlari + "Sotib olish" (telefon raqamini ko'rsatish)

**Admin tomoni** (`/admin/login` orqali JWT bilan himoyalangan):
- `/admin/login`
- `/admin/dashboard`
- `/admin/perfumes` — qidiruv, filter, tahrirlash, o'chirish
- `/admin/perfumes/new` — yangi atir qo'shish (rasm, nom, brend, hajm, jins, tavsif)
- `/admin/perfumes/:id/edit`
- `/admin/customers` — statistika + mijozlar ro'yxati

## 5. Render "sleep" holati

Backend Render Free tarifida ishlaganda, uzoq vaqt so'rov bo'lmasa server uxlab qoladi va birinchi so'rovga javob 30-60 soniya cho'zilishi mumkin. `apiClient` da timeout 45 soniyaga o'rnatilgan; kerak bo'lsa, loading holatlarini (skeleton) shu holatni yumshatish uchun ishlatavering.
