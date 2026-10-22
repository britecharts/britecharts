import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{a as t,n,o as r,r as i}from"./helpers-CrbXQEV5.js";var a,o,s,c,l;function u(){return(u=e((()=>{r(),i(),a=()=>{let e=n(),{colorSchemas:r,colorSchemasHuman:i}=t;return Object.keys(r).forEach(t=>{let n=`js-palette-${t}`,a=document.createElement(`h3`),o=document.createElement(`code`);a.className=`palette-title`,a.textContent=`${i[t]} `,o.textContent=`colorSchemas.${t}`,a.appendChild(o),e.appendChild(a);let s=document.createElement(`div`);s.classList=n,e.appendChild(s);let c=document.getElementsByClassName(n)[0];c.style.display=`flex`,c.style[`margin-bottom`]=`20px`,r[t].forEach(e=>{let t=document.createElement(`div`);t.style.width=`100px`,t.style.height=`100px`,t.style.background=e,c.appendChild(t)})}),e},o=()=>{let e=n(),{colorGradients:r}=t;return Object.keys(r).forEach(t=>{let n=`js-gradient-${t}`,i=document.createElement(`div`);i.classList=n,e.appendChild(i);let a=document.getElementsByClassName(n)[0];a.style.display=`flex`,a.style[`margin-bottom`]=`20px`;let[o,s]=r[t],c=document.createElement(`div`);c.style.width=`900px`,c.style.height=`100px`,c.style.background=`linear-gradient(to right, ${o} 0%, ${s} 100%)`,a.appendChild(c)}),e},s=()=>{let e=n(),{singleColors:r}=t,i=document.createElement(`div`);i.classList=`js-single-color-container`,e.appendChild(i);let a=document.getElementsByClassName(`js-single-color-container`)[0];return a.style.display=`flex`,Object.keys(r).forEach(e=>{let t=document.createElement(`div`);t.style.width=`100px`,t.style.height=`100px`,t.style.background=r[e],a.appendChild(t)}),e},c={title:`Attributes/Colors`},l=[`ColorSchemas`,`ColorGradients`,`SingleColors`],a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`() => {
  const container = getCleanContainer();
  const {
    colorSchemas,
    colorSchemasHuman
  } = colors;
  Object.keys(colorSchemas).forEach(colorPalette => {
    const className = \`js-palette-\${colorPalette}\`;
    // The palette's name, then the key to pass, styled in storybook-preview.css
    const label = document.createElement('h3');
    const key = document.createElement('code');
    label.className = 'palette-title';
    label.textContent = \`\${colorSchemasHuman[colorPalette]} \`;
    key.textContent = \`colorSchemas.\${colorPalette}\`;
    label.appendChild(key);
    container.appendChild(label);
    const wrapper = document.createElement('div');
    wrapper.classList = className;
    container.appendChild(wrapper);
    const paletteDiv = document.getElementsByClassName(className)[0];
    paletteDiv.style.display = 'flex';
    paletteDiv.style['margin-bottom'] = '20px';
    colorSchemas[colorPalette].forEach(color => {
      const div = document.createElement('div');
      div.style.width = '100px';
      div.style.height = '100px';
      div.style.background = color;
      paletteDiv.appendChild(div);
    });
  });
  return container;
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`() => {
  const container = getCleanContainer();
  const {
    colorGradients
  } = colors;
  Object.keys(colorGradients).forEach(colorGradient => {
    const className = \`js-gradient-\${colorGradient}\`;
    const wrapper = document.createElement('div');
    wrapper.classList = className;
    container.appendChild(wrapper);
    const gradientDiv = document.getElementsByClassName(className)[0];
    gradientDiv.style.display = 'flex';
    gradientDiv.style['margin-bottom'] = '20px';
    const [gradientStartColor, gradientEndColor] = colorGradients[colorGradient];
    const div = document.createElement('div');
    div.style.width = '900px';
    div.style.height = '100px';
    div.style.background = \`linear-gradient(to right, \${gradientStartColor} 0%, \${gradientEndColor} 100%)\`;
    gradientDiv.appendChild(div);
  });
  return container;
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`() => {
  const container = getCleanContainer();
  const {
    singleColors
  } = colors;
  const className = 'js-single-color-container';
  const wrapper = document.createElement('div');
  wrapper.classList = className;
  container.appendChild(wrapper);
  const colorsDiv = document.getElementsByClassName('js-single-color-container')[0];
  colorsDiv.style.display = 'flex';
  Object.keys(singleColors).forEach(singleColor => {
    const div = document.createElement('div');
    div.style.width = '100px';
    div.style.height = '100px';
    div.style.background = singleColors[singleColor];
    colorsDiv.appendChild(div);
  });
  return container;
}`,...s.parameters?.docs?.source}}}})))()}u();export{o as ColorGradients,a as ColorSchemas,s as SingleColors,l as __namedExportsOrder,c as default};