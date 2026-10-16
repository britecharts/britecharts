import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{a as t,i as n,n as r,t as i}from"./helpers-DK6iEQil.js";var a,o,s,c,l;function u(){return(u=e((()=>{t(),r(),a=()=>{let e=i(),{colorSchemas:t}=n;return Object.keys(t).forEach(n=>{let r=`js-palette-${n}`,i=document.createElement(`div`);i.classList=r,e.appendChild(i);let a=document.getElementsByClassName(r)[0];a.style.display=`flex`,a.style[`margin-bottom`]=`20px`,t[n].forEach(e=>{let t=document.createElement(`div`);t.style.width=`100px`,t.style.height=`100px`,t.style.background=e,a.appendChild(t)})}),e},o=()=>{let e=i(),{colorGradients:t}=n;return Object.keys(t).forEach(n=>{let r=`js-gradient-${n}`,i=document.createElement(`div`);i.classList=r,e.appendChild(i);let a=document.getElementsByClassName(r)[0];a.style.display=`flex`,a.style[`margin-bottom`]=`20px`;let[o,s]=t[n],c=document.createElement(`div`);c.style.width=`900px`,c.style.height=`100px`,c.style.background=`linear-gradient(to right, ${o} 0%, ${s} 100%)`,a.appendChild(c)}),e},s=()=>{let e=i(),{singleColors:t}=n,r=document.createElement(`div`);r.classList=`js-single-color-container`,e.appendChild(r);let a=document.getElementsByClassName(`js-single-color-container`)[0];return a.style.display=`flex`,Object.keys(t).forEach(e=>{let n=document.createElement(`div`);n.style.width=`100px`,n.style.height=`100px`,n.style.background=t[e],a.appendChild(n)}),e},c={title:`Attributes/Colors`},l=[`ColorSchemas`,`ColorGradients`,`SingleColors`],a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`() => {
  const container = getCleanContainer();
  const {
    colorSchemas
  } = colors;
  Object.keys(colorSchemas).forEach(colorPalette => {
    const className = \`js-palette-\${colorPalette}\`;
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