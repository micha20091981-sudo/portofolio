// NAVBAR HITAM KE PUTIH - SCROLL EFFECT BARU
let lastScrollY = window.scrollY;
let ticking = false;

function updateNavbar() {
    const navbar = document.getElementById('navbar');
    
    if (window.scrollY === 0) {
        // SCROLL KE ATAS (TOP) = HITAM
        navbar.classList.remove('navbar-light');
        navbar.classList.add('navbar-dark');
    } else {
        // SCROLL KE BAWAH = PUTIH
        navbar.classList.remove('navbar-dark');
        navbar.classList.add('navbar-light');
    }
}

// Throttle scroll event
function onScroll() {
    lastScrollY = window.scrollY;
    if (!ticking) {
        requestAnimationFrame(() => {
            updateNavbar();
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', onScroll);

// Update saat load
updateNavbar();

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Typing Effect
const typed = document.getElementById('typed');
const texts = ['Web Developer', 'Frontend Dev', 'UI/UX Designer'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typed.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typed.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500;
    }
    
    setTimeout(typeWriter, typeSpeed);
}

typeWriter();

// Skill Progress Bars
const observerOptions = {
    threshold: 0.7,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-card').forEach(card => {
    observer.observe(card);
});

// Project Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filterValue = btn.getAttribute('data-filter');
        
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.9)';
            }
        });
    });
});

// Contact Form - **KIRIM KE EMAILMU SESUAIKAN**
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Ambil data form
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Email tujuan (GANTI DENGAN EMAILMU)
    const toEmail = 'mikail.syahdina@gmail.com'; // ← UBAH INI
    
    // Buat EmailJS atau Email Link (pilih salah satu)
    
    // OPSI 1: EmailJS (REKOMENDASI - GRATIS)
    // Daftar di https://www.emailjs.com/ lalu ganti:
    /*
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message,
        to_email: toEmail
    }).then(() => {
        alert('✅ Pesan berhasil dikirim!');
        this.reset();
    }).catch(() => {
        alert('❌ Gagal mengirim pesan. Coba lagi!');
    });
    */
    
    // OPSI 2: Buka Email Client (SIMPEL)
    const mailtoLink = `mailto:${toEmail}?subject=${encodeURIComponent(subject || 'Kontak dari Portofolio')}&body=${encodeURIComponent(`Halo Mikail,\n\nNama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`)}`;
    
    // Tampilkan konfirmasi
    const formData = {
        name,
        email,
        subject,
        message
    };
    
    console.log('📧 FORM DATA:', formData); // Debug di console
    
    // Kirim via mailto
    window.location.href = mailtoLink;
    
    // Reset form setelah 1 detik
    setTimeout(() => {
        this.reset();
        alert('📧 Pesan terkirim! Cek email client kamu.');
    }, 500);
    
    // Animasi sukses
    const btn = this.querySelector('button[type="submit"]');
    btn.innerHTML = '✅ Terkirim!';
    btn.style.background = '#10b981';
    setTimeout(() => {
        btn.innerHTML = 'Kirim Pesan 🚀';
        btn.style.background = '#2563eb';
    }, 2000);
});

// Navbar Active Link on Scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});