const articles = [
  // 7月25日会议嘉宾
  { id: 'wang-jiannan', title: '商学院人工智能教学创新之我见', path: '../7.25/王建楠/index.html', date: '7.25' },
  { id: 'cao-nan', title: '在设计学院中创办人工智能专业', path: '../7.25/曹楠/index.html', date: '7.25' },
  { id: 'chu-rongwei', title: '构建未来营销教育：人工智能融合的实践探索', path: '../7.25/褚荣伟/index.html', date: '7.25' },
  { id: 'hu-jie', title: '人工智能时代的高端装备创新设计', path: '../7.25/胡洁/index.html', date: '7.25' },
  { id: 'wu-dianyi', title: '文工融合，筚路开新——计算广告专业培养体系建设及思考', path: '../7.25/吴殿义/index.html', date: '7.25' },
  
  // 7月26日会议嘉宾
  { id: 'zheng-qingsheng', title: 'AI时代的投资思考与机遇', path: '../7.26/郑庆生/index.html', date: '7.26' },
  { id: 'zhang-zhen', title: '同济科技园产教融合育人实践', path: '../7.26/张震/index.html', date: '7.26' },
  { id: 'sonny', title: '面对人工智能，设计的回答和提问', path: '../7.26/sonny/index.html', date: '7.26' },
  { id: 'bao-yifang', title: 'AI 时代的人机协同思考：TRAE 背后的设计故事', path: '../7.26/鲍壹方/index.html', date: '7.26' },
  { id: 'xiaobai', title: '设计师如何玩转AI', path: '../7.26/小白姐姐/index.html', date: '7.26' }
];

const nav = document.getElementById('nav');
const contentContainer = document.getElementById('content-container');

function createNav() {
  const heading = document.createElement('h2');
  heading.textContent = '演讲报告';
  nav.appendChild(heading);

  // 按日期分组
  const groupedArticles = articles.reduce((groups, article) => {
    const date = article.date || 'other';
    if (!groups[date]) groups[date] = [];
    groups[date].push(article);
    return groups;
  }, {});

  // 为每个日期组创建一个章节
  Object.entries(groupedArticles).forEach(([date, dateArticles]) => {
    // 日期标题
    const dateHeading = document.createElement('h3');
    dateHeading.className = 'date-heading';
    dateHeading.textContent = date === '7.25' ? '7月25日' : date === '7.26' ? '7月26日' : '其他';
    nav.appendChild(dateHeading);

    // 该日期的文章列表
    const list = document.createElement('ul');
    list.className = 'nav-list';
    
    dateArticles.forEach((a, index) => {
      const li = document.createElement('li');
      li.className = 'nav-item';
      const link = document.createElement('a');
      link.className = 'nav-link';
      link.href = `#${a.id}`;
      link.dataset.articleId = a.id;
      
      // 为每个演讲者添加图标和演讲者姓名
      const speakerIcons = {
        'wang-jiannan': '🎓',
        'cao-nan': '🎨',
        'chu-rongwei': '📊',
        'hu-jie': '⚙️',
        'wu-dianyi': '📱',
        'zheng-qingsheng': '💰',
        'zhang-zhen': '🏢',
        'sonny': '🎯',
        'bao-yifang': '🤖',
        'xiaobai': '✨'
      };
      
      const speakerNames = {
        'wang-jiannan': '王建楠',
        'cao-nan': '曹楠',
        'chu-rongwei': '褚荣伟',
        'hu-jie': '胡洁',
        'wu-dianyi': '吴殿义',
        'zheng-qingsheng': '郑庆生',
        'zhang-zhen': '张震',
        'sonny': 'Sonny',
        'bao-yifang': '鲍壹方',
        'xiaobai': '小白姐姐'
      };
      
      link.innerHTML = `
        <div class="nav-icon">${speakerIcons[a.id] || '👤'}</div>
        <div class="nav-content">
          <div class="nav-title">${a.title}</div>
          <div class="nav-subtitle">${speakerNames[a.id] || '演讲者'}</div>
        </div>
      `;
      
      link.addEventListener('click', (e) => {
        e.preventDefault();
        loadArticle(a);
        setActive(link);
        history.replaceState({}, '', `#${a.id}`);
      });
      li.appendChild(link);
      list.appendChild(li);
    });
    
    nav.appendChild(list);
  });
}

function setActive(activeLink) {
  document.querySelectorAll('.nav-link').forEach((l) => l.classList.remove('active'));
  activeLink.classList.add('active');
}

async function loadArticle(article) {
  contentContainer.innerHTML = `<p class="loading"><span class="spinner"></span>正在加载「${article.title}」...</p>`;
  const iframe = document.createElement('iframe');
  iframe.className = 'content-frame';
  iframe.src = article.path;
  iframe.setAttribute('referrerpolicy', 'no-referrer');
  iframe.onload = () => {
    bindIframeAutoResize(iframe);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  contentContainer.innerHTML = '';
  contentContainer.appendChild(iframe);
}

function isAbsoluteUrl(url) {
  return /^(?:[a-zA-Z]+:)?\/\//.test(url) || url.startsWith('data:') || url.startsWith('mailto:') || url.startsWith('#');
}

function rewriteRelativeUrls(root, baseDir) {
  const elements = root.querySelectorAll('[src], [href]');
  elements.forEach((el) => {
    if (el.hasAttribute('src')) {
      const src = el.getAttribute('src');
      if (src && !isAbsoluteUrl(src) && !src.startsWith('/')) {
        el.setAttribute('src', baseDir + src);
      }
    }
    if (el.hasAttribute('href')) {
      const href = el.getAttribute('href');
      if (href && !isAbsoluteUrl(href) && !href.startsWith('/')) {
        el.setAttribute('href', baseDir + href);
      }
    }
  });
}

function slugify(text) {
  return text
    .trim()
    .replace(/[\s\t\n\r]+/g, '-')
    .replace(/[。！？、，；：《》【】（）()\[\]{}]/g, '')
    .replace(/[^\w\-\u4e00-\u9fa5]/g, '')
    .toLowerCase();
}

function bindIframeAutoResize(iframe) {
  const recalc = () => {
    const doc = iframe.contentDocument;
    if (!doc) return;
    const height = Math.max(
      doc.body.scrollHeight,
      doc.documentElement.scrollHeight,
      doc.body.offsetHeight,
      doc.documentElement.offsetHeight
    );
    iframe.style.height = height + 'px';
  };
  recalc();
  const doc = iframe.contentDocument;
  if (doc) {
    const ro = new ResizeObserver(recalc);
    ro.observe(doc.documentElement);
    ro.observe(doc.body);
  }
  iframe.contentWindow.addEventListener('resize', recalc);
  setTimeout(recalc, 300);
  setTimeout(recalc, 1000);
}

function init() {
  createNav();
  
  // Load article by hash if present
  const hash = location.hash.replace('#', '');
  if (hash) {
    const target = articles.find((a) => a.id === hash);
    if (target) {
      const link = document.querySelector(`.nav-link[data-article-id="${target.id}"]`);
      if (link) setActive(link);
      loadArticle(target);
    }
  }
}

document.addEventListener('DOMContentLoaded', init);


