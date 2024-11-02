// Mendapatkan elemen modal
var modal = document.getElementById("LoginModal");

// Menampilkan modal
function openModal() {
    modal.style.display = "block";
    document.body.style.overflow = "hidden"; // Disable scrolling
}

// Menyembunyikan modal
function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = ""; // Enable scrolling again
}

// Event listener untuk membuka modal
document.getElementById("openModal").onclick = function() {
    openModal();
}

// Menutup modal saat klik di luar modal
window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}

// Validasi input form dan SweetAlert
document.getElementById('LoginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah pengiriman form default

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Validasi username: harus lowercase dan hanya bisa menggunakan huruf, angka, underscore, atau titik
    const regex = /^[a-z0-9_.]+$/; // Regex untuk validasi username

    if (!regex.test(username)) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Username hanya boleh menggunakan huruf kecil, angka, _ atau .'
        });
        return;
    }

    // Validasi password
    if (password.length < 6) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Password harus memiliki setidaknya 6 karakter.'
        });
        return;
    }

    // Jika validasi lolos
    Swal.fire({
        icon: 'success',
        title: 'Login Berhasil!',
        text: 'Selamat datang, ' + username + '!'
    }).then((result) => {
        if (result.isConfirmed) {
            closeModal(); // Tutup modal setelah SweetAlert ditutup
        }
    });
});

// Menampilkan prompt dengan SweetAlert2 untuk alamat email
document.querySelector('.a-forget').onclick = function() {
    showPrompt();
};

// Fungsi untuk menampilkan prompt
function showPrompt() {
    Swal.fire({
        title: 'Confirm your Email account',
        input: 'email', // Mengatur jenis input menjadi email
        inputLabel: 'Your email',
        inputPlaceholder: 'Your email here',
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        inputValidator: (value) => {
            if (!value) {
                return 'You must enter an email address!';
            } else if (!/\S+@\S+\.\S+/.test(value)) { // Validasi format email
                return 'Invalid email address';
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const email = result.value;
            Swal.fire(`The verification code has been sent to: ${email}`);
        } else if (result.isDismissed) {
            Swal.fire('Canceled', '', 'info');
        }
    });
}
document.querySelector('.sign-up').onclick = function() {
    Swal.fire({
        title: 'Sign Up',
        html: `
            <input type="text" id="signup-name" class="swal2-input" placeholder="Full name">
            <input type="email" id="signup-email" class="swal2-input" placeholder="Email">
            <input type="password" id="signup-password" class="swal2-input" placeholder="Password">
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Sign in',
        cancelButtonText: 'Cancel',
        preConfirm: () => {
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;

            if (!name || !email || !password) {
                Swal.showValidationMessage('Semua kolom harus diisi!');
            } else if (!/\S+@\S+\.\S+/.test(email)) {
                Swal.showValidationMessage('Email tidak valid!');
            }
            return { name: name, email: email, password: password };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const { name, email, password } = result.value;
            Swal.fire(`Thankyou, ${name}! You have registered with email: ${email}`);
        }
    });
};
