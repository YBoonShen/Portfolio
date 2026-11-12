document.addEventListener('DOMContentLoaded', () => {
    initMountain();
    if (document.getElementById('achievement-modal')) initUnderwater();
});

function initMountain() {
    const climber = document.getElementById('climber');
    const projectMarkers = document.querySelectorAll('.mountain-marker');
    const popup = document.getElementById('project-popup');
    const popupContent = document.getElementById('project-popup-content');
    const closeBtn = popup.querySelector('.close-popup');
    const world = document.querySelector('.mountain-world');
    const projectSection = document.getElementById('projects');

    // Day/Night Toggle on Double Click
    world.addEventListener('dblclick', (e) => {
        projectSection.classList.toggle('day-mode');
    });

    projectMarkers.forEach((marker) => {
        marker.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Close existing popup if any
            popup.classList.remove('active');

            const worldRect = world.getBoundingClientRect();
            const markerRect = marker.getBoundingClientRect();
            
            // Directly use the percentage values from the marker's style for perfect alignment
            const targetX = parseFloat(marker.style.left);
            const targetY = parseFloat(marker.style.bottom);

            // Stand directly beside (2% to the left of the pole)
            const standX = targetX - 2;

            // Get current climber position
            const currentX = parseFloat(climber.style.left) || 50;

            // Flip climber based on direction
            const body = climber.querySelector('.climber-body');
            if (standX < currentX) {
                body.style.transform = 'scaleX(-1)';
            } else {
                body.style.transform = 'scaleX(1)';
            }

            // Move climber (Normal Speed Transition)
            climber.style.transition = 'left 1.0s cubic-bezier(0.4, 0, 0.2, 1), bottom 1.0s cubic-bezier(0.4, 0, 0.2, 1)';
            climber.style.left = `${standX}%`;
            climber.style.bottom = `${targetY}%`;
            climber.classList.remove('cheering'); 
            climber.classList.add('climbing');

            // Wait for movement, then show project
            setTimeout(() => {
                climber.classList.remove('climbing');
                climber.classList.add('cheering');
                
                // Flag victory effect
                const flag = marker.querySelector('.flag-cloth');
                flag.style.animation = 'wave 0.1s infinite';
                flag.style.background = '#FFD700'; 
                
                setTimeout(() => {
                    climber.classList.remove('cheering');
                    flag.style.animation = 'wave 2s infinite';
                    showProjectPopup(marker.dataset.projectId, targetX, targetY);
                }, 1000);
            }, 1000); 
        });
    });

    function createFootprint(x, y) {
        const dot = document.createElement('div');
        dot.className = 'pixel-footprint';
        dot.style.left = x;
        dot.style.bottom = y;
        world.appendChild(dot);
        setTimeout(() => dot.remove(), 2000);
    }

    function showProjectPopup(id, x, y) {
        const originalProject = document.querySelector(`.project-source[data-id="${id}"]`);
        if (originalProject) {
            popupContent.innerHTML = originalProject.innerHTML;
            
            popup.classList.add('active');
        }
    }

    closeBtn.addEventListener('click', () => {
        popup.classList.remove('active');
    });

    popup.addEventListener('click', (event) => event.stopPropagation());
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') popup.classList.remove('active');
    });
    projectMarkers.forEach((marker) => marker.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); marker.click(); }
    }));

    // Close on click outside markers
    world.addEventListener('click', () => {
        popup.classList.remove('active');
    });
}

function initUnderwater() {
    const diver = document.getElementById('diver');
    const achievementMarkers = document.querySelectorAll('.underwater-marker');
    const aModal = document.getElementById('achievement-modal');
    const aModalContent = document.getElementById('a-modal-inner-content');
    const aCloseBtn = aModal.querySelector('.close-modal');

    achievementMarkers.forEach((marker) => {
        marker.addEventListener('click', () => {
            const rect = marker.getBoundingClientRect();
            const containerRect = document.querySelector('.underwater-world').getBoundingClientRect();
            
            const x = rect.left - containerRect.left + rect.width / 2;
            const y = rect.top - containerRect.top + rect.height / 2;

            // Move diver
            diver.style.left = `${x}px`;
            diver.style.top = `${y}px`;
            diver.classList.add('swimming');

            // Flip diver based on direction
            const currentX = parseFloat(diver.style.left);
            if (x < currentX) {
                diver.style.transform = 'translate(-50%, -50%) scaleX(-1)';
            } else {
                diver.style.transform = 'translate(-50%, -50%) scaleX(1)';
            }

            setTimeout(() => {
                diver.classList.remove('swimming');
                showAchievementDetails(marker.dataset.achievementId);
            }, 1000);
        });
    });

    function showAchievementDetails(id) {
        const originalAchievement = document.querySelector(`.achievement-source[data-id="${id}"]`);
        if (originalAchievement) {
            aModalContent.innerHTML = originalAchievement.innerHTML;
            aModal.classList.add('active');
        }
    }

    aCloseBtn.addEventListener('click', () => {
        aModal.classList.remove('active');
    });
}
