---
layout: page
title : About
permalink: /about/
---

<h2>Petter Strong</h2>
<p>
  张明，web开发者，摄影师，专注全干技术二十年<br>
  ZhangMing , coder,photographer,dedicated to 
  <strong>FULLSTACK</strong>
   for decades.
</p>
<br>
<center><p ><strong><span class="manual">About</span> Me</strong></p></center>
<br>
<div class="manual-post">
  <div class="manual manual-title">
  <strong>关于我</strong>
  </div>
<p>  <div class="manual-content">

      - <code>轻度</code><br/>
      - <code>轻度</code>代码洁癖.<br/>
      - <code class="highlighter-rouge">重度</code> 学习爱好者.<br>
      - <code>重度</code>MAC依赖用户.<br>
      - <code>喜欢折腾</code>尤其是在搞机的方面.<br/>
      - <code>有态度，有理想，有思想，有抱负</code>的新时代
      <div class="example">
        <span class='manual'>FORMAT</span><BR>
        <pre>---
layout: post | default | page
title:  String<span class="hint"> Post Title</span>
date:   Time Stamp
categories: String | Array of Strings<span class="hint"> Category / Categories </span>
---</pre>
      </div>
      <div class="example">

        <pre>---
layout: post
title:  "The One with the Blackout"
date:   2016-03-30 19:45:31 +0530
categories: ["life", "friends"]
---</pre>
      </div>


  </div>
</p>
</div>
<br>
<div class="manual-post">
  <div class="manual manual-title">
  <strong>Create Pages</strong>
  </div>
<p>  <div class="manual-content">

      - Create a .md file in the root directory.<br>
      - Name the file with the desired page link name.<br>  <code>about.md</code><br><code>design.md</code><br>
      - Write the <a href="jekyll">Front Matter</a> and content in the file.
      <div class="example">
        <span class='manual'>FORMAT</span><BR>
        <pre>---
layout: page
title: String <span class="hint">Title of the webpage</span>
permalink: / String / <span class="hint">Permalink for the webpage</span>
tagline: String <span class="hint">Optional Gravity Feature : Tagline for the page</span>
---</pre>
      </div>
      <div class="example">

        <pre>---
layout: page
title:  "Science"
permalink:   /science/
tagline : "Humanity is overrated."
---</pre>
      </div>


  </div>
</p>
</div>
<br>
<div class="manual-post">
  <div class="manual manual-title">
  <strong>Create Archives/ Category Pages</strong><br>
</div><br>
<div class="archiveIntro">
  <p>
    Introducing <strong>Archive Pages</strong>.<br></p>
  <span class="archive-intro">  You can display a list of all the post corresponding to a particular category on a standalone Page using the <code>'archive'</code> layout.
</span>
</div>
<br>

<p>  <div class="manual-content">

      - Create a .md file in the root directory.<br>
      - Name the file. Preferred name will be the name of the category<br>  <code>life.md</code><br>
      - Write the <a href="jekyll">Front Matter</a> and content in the file.
      <div class="example">
        <span class='manual'>FORMAT</span><BR>
    <pre>---
layout: archive<span class="hint"> Archive Page Layout</span>
title: String <span class="hint">Title of the webpage</span>
permalink: / String / <span class="hint">Permalink for the webpage</span>
tagline: String <span class="hint"> Tagline for the page</span>
category : String <span class="hint"> Name of the category of which the page will show posts.</span>
---</pre>
      </div>
      <div class="example">

        <pre>---
layout: archive
title:  "Design"
permalink : "Design"
category: "design"
tagline: "It's all about perception."
---</pre>
    </div><br>
  </div>
</p>
</div>
