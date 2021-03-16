/**
 *
 * This code was taken from
 * https://github.com/MichaelDeBoey/gatsby-remark-embedder
 *
 * Original license
 *
 *
 * The MIT License (MIT)
 * Copyright (c) 2020 Michaël De Boey
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import type { Transformer } from '@remark-embedder/core';

const CodeSandboxTransformer: Transformer = {
  name: 'CodeSandbox',
  shouldTransform(url) {
    const { host, pathname } = new URL(url);

    return ['codesandbox.io', 'www.codesandbox.io'].includes(host) && pathname.includes('/s/');
  },
  getHTML(url) {
    const iframeUrl = url.replace('/s/', '/embed/');

    return `<iframe src="${iframeUrl}" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>`;
  },
};

export const getTimeValueInSeconds = (timeValue: string) => {
  if (Number(timeValue).toString() === timeValue) {
    return timeValue;
  }

  const { 2: hours = '0', 4: minutes = '0', 6: seconds = '0' } = timeValue.match(
    /((\d*)h)?((\d*)m)?((\d*)s)?/
  );

  return String((Number(hours) * 60 + Number(minutes)) * 60 + Number(seconds));
};

export const getYouTubeIFrameSrc = (urlString: string) => {
  const url = new URL(urlString);
  const id = url.host === 'youtu.be' ? url.pathname.slice(1) : url.searchParams.get('v');

  const embedUrl = new URL(`https://www.youtube-nocookie.com/embed/${id}?rel=0`);

  url.searchParams.forEach((value, name) => {
    if (name === 'v') {
      return;
    }

    if (name === 't') {
      embedUrl.searchParams.append('start', getTimeValueInSeconds(value));
    } else {
      embedUrl.searchParams.append(name, value);
    }
  });

  return embedUrl.toString();
};

const YouTubeTransformer: Transformer = {
  name: 'YouTube',
  shouldTransform(url) {
    const { host, pathname, searchParams } = new URL(url);

    return (
      host === 'youtu.be' ||
      (['youtube.com', 'www.youtube.com'].includes(host) &&
        pathname.includes('/watch') &&
        Boolean(searchParams.get('v')))
    );
  },

  getHTML(url) {
    const iframeSrc = getYouTubeIFrameSrc(url);

    return `<iframe width="100%" height="100%" src="${iframeSrc}" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>`;
  },
};

export default [CodeSandboxTransformer, YouTubeTransformer];
