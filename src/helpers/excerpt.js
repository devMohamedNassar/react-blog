import marked from 'marked';
import PlainTextRenderer from 'marked-plaintext';

export const excerpt = (str, length = 150) => {
	//get the excerpt as a plain text
	const renderer = new PlainTextRenderer();
	str = marked(str, {renderer});
	if(str.length > length) return str.substr(0, length) + '...';
	return str;
}