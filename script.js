document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
  
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
  
    // Profile image adjustment
    const profileImg = document.getElementById('profileImage');
    if (profileImg) {
        profileImg.addEventListener('mouseenter', () => {
            profileImg.style.transform = 'scale(1.03)';
        });
        profileImg.addEventListener('mouseleave', () => {
            profileImg.style.transform = 'scale(1)';
        });
    }
  
    // GitHub Chart
    const githubCtx = document.getElementById('githubChart');
    if (githubCtx) {
        const githubChart = new Chart(githubCtx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'GitHub Contributions',
                    data: [8, 12, 15, 18, 22, 25, 30, 28, 24, 20, 18, 22],
                    backgroundColor: '#3B82F6',
                    borderColor: '#2563EB',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            display: false
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: '#1E293B',
                        titleColor: '#F8FAFC',
                        bodyColor: '#F8FAFC',
                        borderColor: '#64748B',
                        borderWidth: 1,
                        padding: 10
                    }
                }
            }
        });
    }
  
    // Animate tech icons when they come into view
    const techIcons = document.querySelectorAll('.tech-icon');
    const animateIcons = () => {
        techIcons.forEach(icon => {
            const iconPosition = icon.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (iconPosition < screenPosition) {
                icon.classList.add('floating');
            }
        });
    };
  
    // Run once on load
    animateIcons();
    
    // Run on scroll
    window.addEventListener('scroll', animateIcons);
  
    // Animate elements when scrolling
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.section, .project-card, .experience-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
  
    // Set initial state for animated elements
    document.querySelectorAll('.section, .project-card, .experience-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
  
    // Run once on load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
  
    // Project cards hover effect
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 20;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 20;
            card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg) translateY(-10px) scale(1.02)`;
        });
        
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transition = 'all 0.5s ease';
            card.style.transform = 'rotateY(0deg) rotateX(0deg)';
        });
    });

    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Schedule Modal Functionality
    const modal = document.getElementById('scheduleModal');
    const scheduleBtn = document.getElementById('scheduleBtn');
    const closeModal = document.querySelector('.close-modal');
    const scheduleForm = document.getElementById('scheduleForm');
    const confirmation = document.getElementById('confirmation');

    // Open modal
    scheduleBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Initialize date picker
    flatpickr("#date", {
        minDate: "today",
        maxDate: new Date().fp_incr(30), // 30 days from now
        dateFormat: "Y-m-d",
        disable: [
            function(date) {
                // Disable weekends
                return (date.getDay() === 0 || date.getDay() === 6);
            }
        ],
        onChange: function(selectedDates, dateStr, instance) {
            generateTimeSlots(dateStr);
        }
    });

    // Generate time slots
    function generateTimeSlots(date) {
        const timeSlotsContainer = document.getElementById('timeSlots');
        const selectedTimeInput = document.getElementById('selectedTime');
        timeSlotsContainer.innerHTML = '';
        
        // Get day of week (0-6, where 0 is Sunday)
        const day = new Date(date).getDay();
        
        // Different time slots for weekdays
        let slots = [];
        if (day >= 1 && day <= 5) { // Weekdays
            slots = [
                '09:00 AM', '10:00 AM', '11:00 AM',
                '01:00 PM', '02:00 PM', '03:00 PM',
                '04:00 PM', '05:00 PM'
            ];
        } else { // Weekend (though we disabled weekends)
            slots = [
                '10:00 AM', '11:00 AM',
                '02:00 PM', '03:00 PM'
            ];
        }
        
        slots.forEach(slot => {
            const slotElement = document.createElement('div');
            slotElement.className = 'time-slot';
            slotElement.textContent = slot;
            slotElement.addEventListener('click', function() {
                document.querySelectorAll('.time-slot').forEach(el => el.classList.remove('selected'));
                this.classList.add('selected');
                selectedTimeInput.value = slot;
            });
            timeSlotsContainer.appendChild(slotElement);
        });
    }

    // Handle form submission
    scheduleForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const date = document.getElementById('date').value;
        const selectedTime = document.getElementById('selectedTime').value;
        
        if (!name || !email || !date || !selectedTime) {
            alert('Please fill all required fields and select a time slot');
            return;
        }
        
        // Submit the form
        fetch(scheduleForm.action, {
            method: 'POST',
            body: new FormData(scheduleForm),
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                scheduleForm.style.display = 'none';
                confirmation.style.display = 'block';
            } else {
                throw new Error('Form submission failed');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was a problem submitting your request. Please try again later.');
        });
    });
});