// Tech stack icons — rendered into #stackGrid
// dev() = Devicon CDN (coloured SVG), si() = Simple Icons CDN
const dev = (name, variant) =>
    `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-${variant || 'original'}.svg`;
const si = (slug) => `https://cdn.simpleicons.org/${slug}`;

const STACK = [
    {
        title: 'Programming Languages',
        items: [
            { name: 'Java', icon: dev('java'), url: 'https://docs.oracle.com/en/java/' },
            { name: 'Python', icon: dev('python'), url: 'https://docs.python.org/3/' },
            { name: 'SQL', url: 'https://www.w3schools.com/sql/' },
            { name: 'JavaScript', icon: dev('javascript'), url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
            { name: 'TypeScript', icon: dev('typescript'), url: 'https://www.typescriptlang.org/docs/' },
            { name: 'C++', icon: dev('cplusplus'), url: 'https://en.cppreference.com/w/' },
        ],
    },
    {
        title: 'Web & Frameworks',
        items: [
            { name: 'FastAPI', icon: dev('fastapi'), url: 'https://fastapi.tiangolo.com/' },
            { name: 'Flask', icon: dev('flask', 'original'), url: 'https://flask.palletsprojects.com/' },
            { name: 'React', icon: dev('react'), url: 'https://react.dev/' },
            { name: 'Node.js', icon: dev('nodejs'), url: 'https://nodejs.org/en/docs' },
            { name: 'Angular', icon: dev('angular'), url: 'https://angular.dev/' },
            { name: 'JSP', url: 'https://jakarta.ee/specifications/pages/' },
            { name: 'Cordova', icon: dev('cordova'), url: 'https://cordova.apache.org/docs/' },
            { name: 'HTML', icon: dev('html5'), url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
            { name: 'CSS', icon: dev('css3'), url: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
        ],
    },
    {
        title: 'Databases',
        items: [
            { name: 'MySQL', icon: dev('mysql'), url: 'https://dev.mysql.com/doc/' },
            { name: 'MariaDB', icon: dev('mariadb'), url: 'https://mariadb.com/kb/en/documentation/' },
            { name: 'PostgreSQL', icon: dev('postgresql'), url: 'https://www.postgresql.org/docs/' },
            { name: 'IBM DB2', url: 'https://www.ibm.com/docs/en/db2' },
            { name: 'Firebase', icon: dev('firebase'), url: 'https://firebase.google.com/docs' },
        ],
    },
    {
        title: 'Development & Deployment',
        items: [
            { name: 'Git', icon: dev('git'), url: 'https://git-scm.com/doc' },
            { name: 'Gerrit', icon: si('gerrit'), url: 'https://gerrit-review.googlesource.com/Documentation/' },
            { name: 'Bugzilla', url: 'https://bugzilla.readthedocs.io/' },
            { name: 'JBoss EAP', url: 'https://docs.redhat.com/en/documentation/red_hat_jboss_enterprise_application_platform' },
            { name: 'SoapUI', url: 'https://www.soapui.org/docs/' },
            { name: 'DBeaver', icon: si('dbeaver'), url: 'https://dbeaver.com/docs/dbeaver/' },
            { name: 'Linux', icon: dev('linux'), url: 'https://docs.kernel.org/' },
            { name: 'PuTTY', icon: dev('putty'), url: 'https://www.chiark.greenend.org.uk/~sgtatham/putty/docs.html' },
            { name: 'Oracle Cloud', icon: dev('oracle'), url: 'https://docs.oracle.com/en-us/iaas/Content/home.htm' },
            { name: 'Eclipse', icon: dev('eclipse'), url: 'https://help.eclipse.org/' },
            { name: 'Android Studio', icon: dev('androidstudio'), url: 'https://developer.android.com/studio/intro' },
            { name: 'Claude Code', icon: si('claude'), url: 'https://docs.claude.com/' },
            { name: 'Docker', icon: dev('docker'), url: 'https://docs.docker.com/' },
            { name: 'Figma', icon: dev('figma'), url: 'https://help.figma.com/' },
        ],
    },
    {
        title: 'Security Tools',
        items: [
            { name: 'Burp Suite', icon: si('burpsuite'), url: 'https://portswigger.net/burp/documentation' },
            { name: 'OWASP ZAP', icon: si('zap'), url: 'https://www.zaproxy.org/docs/' },
            { name: 'WebGoat', icon: si('owasp'), url: 'https://owasp.org/www-project-webgoat/' },
            { name: 'THC Hydra', url: 'https://github.com/vanhauser-thc/thc-hydra' },
            { name: 'enum4linux', url: 'https://www.kali.org/tools/enum4linux/' },
            { name: 'CyberChef', url: 'https://github.com/gchq/CyberChef' },
        ],
    },
];

function initials(name) {
    var words = name.split(/[\s/]+/).filter(Boolean);
    var text = words.length > 1 ? words.map(function (w) { return w[0]; }).join('') : name.slice(0, 3);
    return text.slice(0, 3).toUpperCase();
}

document.addEventListener('DOMContentLoaded', function () {
    var root = document.getElementById('stackGrid');
    if (!root) return;

    STACK.forEach(function (group) {
        var section = document.createElement('div');
        section.className = 'stack-group';

        var heading = document.createElement('h3');
        heading.textContent = group.title;

        var grid = document.createElement('div');
        grid.className = 'stack-grid';

        group.items.forEach(function (item) {
            var link = document.createElement('a');
            link.className = 'stack-item';
            link.href = item.url;
            link.target = '_blank';
            link.rel = 'noopener';
            link.title = item.name + ' docs';

            var tile = document.createElement('span');
            tile.className = 'stack-icon';

            var fallback = document.createElement('b');
            fallback.textContent = initials(item.name);

            if (item.icon) {
                var img = document.createElement('img');
                img.src = item.icon;
                img.alt = '';
                img.loading = 'lazy';
                img.addEventListener('error', function () { img.replaceWith(fallback); });
                tile.appendChild(img);
            } else {
                tile.appendChild(fallback);
            }

            var label = document.createElement('span');
            label.textContent = item.name;

            link.appendChild(tile);
            link.appendChild(label);
            grid.appendChild(link);
        });

        section.appendChild(heading);
        section.appendChild(grid);
        root.appendChild(section);
    });
});
