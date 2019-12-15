function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); return null;});
    return images;
}

export default importAll(require.context('assets/img/auth_images', false, /\.(png|jpe?g|svg)$/));
