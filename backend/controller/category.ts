import express from "express";
import Category, {CategoryType} from "../models/category";

// Create new category
export const createCategory = (req: express.Request, res: express.Response) => {
    Category.findOne({name: req.body.name, user: req.body.user}, (err: Error | null, category: CategoryType | null) => {
       if (!category) {
            const newCategory = new Category({
                _id : req.body.name,
                name: req.body.name,
                tags: req.body.tags,
                color: req.body.color,
                user: req.body.user
            });

            newCategory.save()
            .then((data: CategoryType) => {
                console.log(data);
                res.status(201).send('Category created');
            })
            .catch((err: Error) => {
                console.error(err);
                res.status(500).send('Internal Server Error');
            });

       }else {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
            } else {
                // already exists
                res.status(409).send('Category name already in use');
            }
        }
    });
};

// Get all categories
export const getCategories = (req: express.Request, res: express.Response) => {
    Category.find()
    .then((data: CategoryType[]) => {
        res.status(200).send(data);
    })
    .catch((err: Error) => {
        console.error(err);
        res.status(500).send('Internal Server Error');
    });
}

// Get all categories by user
export const getCategoriesByUser = (req: express.Request, res: express.Response) => {
    Category.find({user: req.body.user})
    .then((data: CategoryType[]) => {
        res.status(200).send(data);
    })
    .catch((err: Error) => {
        console.error(err);
        res.status(500).send('Internal Server Error');
    });
}

// Get category by name
export const getCategory = (req: express.Request, res: express.Response) => {
    Category.findOne({name: req.params.name, user: req.body.user})
    .then((data: CategoryType | null) => {
        if (data) {
            res.status(200).send(data);
        } else {
            res.status(404).send('Category not found');
        }
    })
    .catch((err: Error) => {
        console.error(err);
        res.status(500).send('Internal Server Error');
    });
}


// Update category
export const updateCategory = (req: express.Request, res: express.Response) => {
    Category.findOneAndUpdate({name: req.params.name, user: req.body.user}, req.body, {new: true})
    .then((data: CategoryType | null) => {
        if (data) {
            res.status(200).send(data);
        } else {
            res.status(404).send('Category not found');
        }
    })
    .catch((err: Error) => {
        console.error(err);
        res.status(500).send('Internal Server Error');
    });
}

// Delete category
export const deleteCategory = (req: express.Request, res: express.Response) => {
    Category.findOneAndDelete({name: req.params.name, user: req.body.user})
    .then((data: CategoryType | null) => {
        if (data) {
            res.status(200).send('Category deleted');
        } else {
            res.status(404).send('Category not found');
        }
    })
    .catch((err: Error) => {
        console.error(err);
        res.status(500).send('Internal Server Error');
    });
}