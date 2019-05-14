export const jointUri = (pre, suf) => {
  if (typeof pre !== 'string' || typeof suf !== 'string') {
    console.error("uri address is not a string!");
  }
  if (!pre || !pre.trim() || !suf || !suf.trim()){
    return pre && pre.trim() ? pre : suf;
  }
  if (!pre.endsWith('/') && !suf.startsWith('/')) {
    return pre + '/' + suf;
  } else if (pre.endsWith('/') && suf.startsWith('/')) {
    return pre + suf.substr(1);
  } else {
    return pre + suf;
  }
};

export default {jointUri}
