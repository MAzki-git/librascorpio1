// =====================================================
// PASSWORD
// =====================================================

const PASSWORD = "1juli2023";

// =====================================================
// LOGIN
// =====================================================

function login() {
  const input = document.getElementById("password");
  const error = document.getElementById("error");

  if (!input) return;

  const password = input.value.trim().toLowerCase().replace(/\s+/g, "");

  if (password === PASSWORD) {
    // Sembunyikan halaman login
    const loginPage = document.getElementById("loginPage");
    if (loginPage) {
      loginPage.style.display = "none";
    }

    // Tampilkan website
    const website = document.getElementById("website");
    if (website) {
      website.style.display = "block";
    }

    // Hitung lama hubungan
    calculateDays();

    // =================================================
    // AUTO PLAY MUSIC SETELAH LOGIN
    // =================================================

    const music = document.getElementById("backgroundMusic");
    const icon = document.getElementById("musicIcon");

    if (music) {
      // Volume 40%
      music.volume = 0.4;

      music
        .play()
        .then(() => {
          // Ubah icon menjadi pause
          if (icon) {
            icon.className = "bi bi-pause-fill";
          }
        })
        .catch((err) => {
          // Browser bisa saja memblokir audio
          console.log("Musik tidak dapat diputar:", err);
        });
    }

    // Kembali ke posisi paling atas
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  } else {
    // Password salah
    error.innerText = "Password salah ❤️ Coba lagi.";

    input.value = "";
    input.focus();

    // Animasi shake
    input.style.animation = "shake .4s";

    setTimeout(() => {
      input.style.animation = "";
    }, 400);
  }
}

// =====================================================
// ENTER LOGIN
// =====================================================

document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("password");

  if (input) {
    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        login();
      }
    });
  }
});

// =====================================================
// HITUNG LAMA HUBUNGAN
// =====================================================

function calculateDays() {
  // Tanggal jadian
  const startDate = new Date("2023-07-01T00:00:00");

  // Tanggal hari ini
  const today = new Date();

  // Set kedua tanggal ke jam 00:00
  startDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  // Hitung selisih waktu
  const difference = today.getTime() - startDate.getTime();

  // Konversi milidetik menjadi hari
  let days = Math.floor(difference / (1000 * 60 * 60 * 24));

  // Jangan sampai negatif
  if (days < 0) {
    days = 0;
  }

  // Tampilkan hasil
  const counter = document.getElementById("daysTogether");

  if (counter) {
    counter.innerText = days.toLocaleString("id-ID");
  }
}

// =====================================================
// UPDATE DAYS SETIAP MENIT
// =====================================================

setInterval(function () {
  calculateDays();
}, 60000);

// =====================================================
// MUSIC
// =====================================================

function toggleMusic() {
  const music = document.getElementById("backgroundMusic");
  const icon = document.getElementById("musicIcon");

  if (!music) return;

  if (music.paused) {
    music
      .play()
      .then(() => {
        if (icon) {
          icon.className = "bi bi-pause-fill";
        }
      })
      .catch(() => {
        alert(
          "File lagu tidak ditemukan. Pastikan abadi.mp3 ada di folder asset/music.",
        );
      });
  } else {
    music.pause();

    if (icon) {
      icon.className = "bi bi-music-note";
    }
  }
}

// =====================================================
// OPEN PHOTO
// =====================================================

function openPhoto(button) {
  const parent = button.closest(".photo-image, .featured-photo");

  if (!parent) return;

  const image = parent.querySelector("img");

  const lightbox = document.getElementById("lightbox");

  const lightboxImage = document.getElementById("lightboxImage");

  if (!image || !lightbox || !lightboxImage) {
    return;
  }

  // Masukkan gambar ke lightbox
  lightboxImage.src = image.src;

  // Tampilkan lightbox
  lightbox.classList.add("active");

  // Lock scroll halaman
  document.body.style.overflow = "hidden";
}

// =====================================================
// CLOSE PHOTO
// =====================================================

function closePhoto() {
  const lightbox = document.getElementById("lightbox");

  if (!lightbox) return;

  lightbox.classList.remove("active");

  // Kembalikan scroll
  document.body.style.overflow = "";
}

// =====================================================
// ESC CLOSE
// =====================================================

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closePhoto();
  }
});

// =====================================================
// CLICK OUTSIDE IMAGE
// =====================================================

document.addEventListener("DOMContentLoaded", function () {
  const lightbox = document.getElementById("lightbox");

  if (!lightbox) return;

  lightbox.addEventListener("click", function (event) {
    // Jika klik area luar gambar
    if (event.target === lightbox) {
      closePhoto();
    }
  });
});

// =====================================================
// NAVBAR EFFECT
// =====================================================

window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");

  if (!navbar) return;

  if (window.scrollY > 50) {
    navbar.style.padding = "12px 0";

    navbar.style.boxShadow = "0 10px 35px rgba(80,40,52,.08)";
  } else {
    navbar.style.padding = "20px 0";

    navbar.style.boxShadow = "none";
  }
});

// =====================================================
// SCROLL REVEAL
// =====================================================

document.addEventListener("DOMContentLoaded", function () {
  const elements = document.querySelectorAll(
    ".photo-card, .reason-card, .timeline-item",
  );

  // Cek apakah browser mendukung IntersectionObserver
  if (!("IntersectionObserver" in window)) {
    elements.forEach(function (element) {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    });

    return;
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";

          entry.target.style.transform = "translateY(0)";

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
    },
  );

  elements.forEach(function (element, index) {
    element.style.opacity = "0";

    element.style.transform = "translateY(30px)";

    element.style.transition = `opacity .7s ease ${index * 0.05}s,
       transform .7s ease ${index * 0.05}s`;

    observer.observe(element);
  });
});

// =====================================================
// SMOOTH NAVIGATION
// =====================================================

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      const id = this.getAttribute("href");

      const target = document.querySelector(id);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
});
