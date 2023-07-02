const Page = require('../models/pageModel');

// Get all pages
const getPages = async (req, res) => {
try {
const pages = await Page.find({}).sort({ createdAt: -1 });
res.status(200).json(pages);
} catch (error) {
res.status(400).json({ error: error.message });
}
};

// Get About Us page
const getAboutUsPage = async (req, res) => {
try {
const aboutUsPage = await Page.findOne({ name: 'About Us' });
if (!aboutUsPage) {
return res.status(404).json({ error: 'About Us page not found' });
}
res.status(200).json(aboutUsPage);
} catch (error) {
res.status(400).json({ error: error.message });
}
};

// Get Returns page
const getReturnsPage = async (req, res) => {
try {
const returnsPage = await Page.findOne({ name: 'Returns and Exchange' });
if (!returnsPage) {
return res.status(404).json({ error: 'Returns page not found' });
}
res.status(200).json(returnsPage);
} catch (error) {
res.status(400).json({ error: error.message });
}
};

// Update About Us page
const updateAboutUsPage = async (req, res) => {
try {
const aboutUsPage = await Page.findOneAndUpdate(
{ name: 'About Us' },
{ $set: req.body },
{ new: true }
);
if (!aboutUsPage) {
return res.status(404).json({ error: 'About Us page not found' });
}
res.status(200).json(aboutUsPage);
} catch (error) {
res.status(400).json({ error: error.message });
}
};

// Update Returns page
const updateReturnsPage = async (req, res) => {
try {
const returnsPage = await Page.findOneAndUpdate(
{ name: 'Returns and Exchange' },
{ $set: req.body },
{ new: true }
);
if (!returnsPage) {
return res.status(404).json({ error: 'Returns page not found' });
}
res.status(200).json(returnsPage);
} catch (error) {
res.status(400).json({ error: error.message });
}
};


// Create About Us page
const createAboutUsPage = async (req, res) => {
  try {
    const aboutUsPage = await Page.create({
      name: 'About Us',
      content: 'This is the content of the About Us page.'
    });
    res.status(201).json(aboutUsPage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create Returns page
const createReturnsPage = async (req, res) => {
  try {
    const returnsPage = await Page.create({
      name: 'Returns and Exchange',
      content: 'This is the content of the Returns page.'
    });
    res.status(201).json(returnsPage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = {
getPages,
getAboutUsPage,
getReturnsPage,
updateAboutUsPage,
updateReturnsPage,
createAboutUsPage,
createReturnsPage
};