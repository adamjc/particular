var Particular = (function() {
    var particular = {};

    /* Public methods */
    particular.hook = function(element, options) {
        return createParticular(element, options);
    }

    function createParticular(element, options) {
        var options = options || {};

        var particularObject = {};

        var canvas;
        var context;

        var animationFrameId;

        var particleAmount = options.particleAmount || 100;
        var particles = [];

        var time = 0;

        canvas = element;
        context = canvas.getContext('2d');

        /* Public methods */
        particularObject.start = function() {
            canvas.width = canvas.parentNode.offsetWidth;
            canvas.height = canvas.parentNode.offsetHeight;

            createParticles();
            warmUpParticles();

            update();
        }

        particularObject.stop = function() {
            window.cancelAnimationFrame(animationFrameId);
        }

        particularObject.updateParticleAmount = function(newParticleAmount) {
            if (newParticleAmount < particles.length) {
                particles = particles.slice(0, newParticleAmount);
            } else {
                var diffParticles = newParticleAmount - particles.length;

                for (var i = 0; i < diffParticles; i++) {
                    var particle = createParticle();
                    particle.initialize();
                    particles.push(particle);
                }
            }
        }

        /* Private methods */
        function update() {
            time += 0.002;

            animationFrameId = window.requestAnimationFrame(update);

            updateParticles();

            render();
        }

        function render() {
            context.clearRect(0 , 0 , canvas.width, canvas.height);

            for (var i = 0; i < particles.length; i++) {
                context.beginPath();
                context.arc(particles[i].x, particles[i].y, particles[i].calculatedWidth, 0, 2 * Math.PI);

                context.fillStyle = 'rgba(255, 255, 255, ' + particles[i].opacity + ')';
                context.fill();
            }
        }

        function createParticles() {
            for (var i = 0; i < particleAmount; i++) {
                var particle = createParticle();
                particle.initialize();
                particles.push(particle);
            }
        }

        function warmUpParticles() {
            for (var i = 0; i < particles.length; i++) {
                particles[i].y = particles[i].yVel * 500;
                var x = Math.cos(particles[i].xVel);
                particles[i].x += x;
                particles[i].lifeTime = 250;
                particles[i].opacity = 1 - (particles[i].lifeTime / particles[i].maxLifeTime);
            }
        }

        function updateParticles() {
            for (var i = 0; i < particles.length; i++) {
                particles[i].y += particles[i].yVel;
                var x = Math.sin(particles[i].xVel);
                particles[i].x += x;
                particles[i].lifeTime++;
                particles[i].opacity = 1 - (particles[i].lifeTime / particles[i].maxLifeTime);

                if ((particles[i].y > canvas.height + particles[i].calculatedHeight) || particles[i].lifeTime > particles[i].maxLifeTime) {
                    resetParticle(particles[i]);
                }
            }
        }

        function resetParticle(particle) {
            particle.initialize();
        }

        function createParticle() {
            var Particle = {
                x: 0,
                startX: 0,
                y: 0,
                xVel: 0,
                yVel: 1,
                width: 5,
                calculatedWidth: 0,
                height: 5,
                calculatedHeight: 0,
                lifeTime: 0,
                maxLifeTime: 0,
                colour: '#000',
                opacity: 1,
                scale: 0,
                initialize: function(options) {
                    this.startX = Random.range(0, canvas.width);
                    this.y = -this.width;
                    this.x = Random.range(0, canvas.width);
                    this.yVel = Random.range(0.1, 0.5);
                    this.xVel = Random.range(-5, 5);
                    this.opacity = 1;
                    this.lifeTime = 0;
                    this.maxLifeTime = Random.rangeInt(100, 1000);
                    this.scale = this.yVel / 1;
                    this.calculatedHeight = this.scale * this.height;
                    this.calculatedWidth = this.scale * this.width;
                }
            }

            return Object.create(Particle);
        }

        return particularObject;
    }

    return particular;
}());
