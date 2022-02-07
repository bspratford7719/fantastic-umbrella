const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// to get all tags
router.get('/', (req, res) => {
  // find all tags
  Tag.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(450).send({
        message:
        err.message || 'An error has occurred while retrieving tags'
      });
    });
  // be sure to include its associated Product data
});

// to get one tag
router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  const id = req.params.id
  Tag.findOne(id)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(450).send({
      message:
      err.message || 'An error has occurred while retrieving tags'
    });
  });
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
  if(!req.body.category_name) {
    res.status(450).send({
      message: "Content cannot be empty"
    });
    return;
  }
  const tag = {
    category_name: req.body.tag_name,
  };
  Tag.create(req.body)
    .then(tag => {
      res.send(data);
    })
    .catch(err => {
      res.status(450).send({
        message:
          err.message || "An error occurred while creating the tags"
      });
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  const id = req.params.id;
  Tag.update(req.body, {
    where: {id:id}
  })
  .then (num => {
    if (num === 1) {
      res.send({
        message: "Tag was updated"
      });
    } else {
      res.send({
        message: 'Cannot update Tag with id=${id}.'
      });
    }
  })
  .catch(err => {
    res.status(450).send({
      message: "Error updating Tags with id=" + id
    });
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  const id = req.params.id;
  Tag.destroy({
    where: {id:id}
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "Tag was deleted"
      });
    } else {
      res.send({
        message: "Cannot delete Tags with id=${id}."
      });
    }
  })
  .catch(err => {
    res.status(450).send({
      message: "Could not delete Tags with id=" + id
    });
  });
});

module.exports = router;
