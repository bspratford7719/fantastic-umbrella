const router = require('express').Router();
const { response } = require('express');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// to get all categories
router.get('/', (req, res) => {
  // find all categories
  Category.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(450).send({
        message:
        err.message || 'An error has occurred while retrieving categories'
      });
    });
  // be sure to include its associated Products
});

// to get one category
router.get('/:id', (req, res) => {
  // find one category by its `id` value
  const id = req.params.id
  Category.findOne(id)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(450).send({
      message:
      err.message || 'An error has occurred while retrieving categories'
    });
  });
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
    if(!req.body.category_name) {
      res.status(450).send({
        message: "Content cannot be empty"
      });
      return;
    }
    const category = {
      category_name: req.body.category_name,
    };
    Category.create(req.body)
      .then(category => {
        res.send(data);
      })
      .catch(err => {
        res.status(450).send({
          message:
            err.message || "An error occurred while creating the categories"
        });
      });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  const id = req.params.id;
  Category.update(req.body, {
    where: {id:id}
  })
  .then (num => {
    if (num === 1) {
      res.send({
        message: "Category was updated"
      });
    } else {
      res.send({
        message: 'Cannot update Category with id=${id}.'
      });
    }
  })
  .catch(err => {
    res.status(450).send({
      message: "Error updating Category with id=" + id
    });
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  const id = req.params.id;
  Category.destroy({
    where: {id:id}
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "Category was deleted"
      });
    } else {
      res.send({
        message: "Cannot delete Category with id=${id}."
      });
    }
  })
  .catch(err => {
    res.status(450).send({
      message: "Could not delete Category with id=" + id
    });
  });
});

module.exports = router;
