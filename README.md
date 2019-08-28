# Datalyzer

Explore, slice and dice event and dimensional metric data with this handy NerdPack

Author: Lew Cirne

## Screenshot
![screenshot](./screenshots/screenshot.png)

## Running Locally

Run the following scripts:

```
npm install
npm start
```

Open https://one.newrelic.com/?packages=local

Pick an account, and select a metric or event data to plot.

On the left, you'll see a set of _dimensions_ and _attributes_:
- Dimensions are facets that apply to the selected metric/attribute, with a cardinality of greater than 1.  The cardinality of each dimension is displayed to give the user a hint about what dimensions might be "interesting".
- Attributes are facets with a cardinality of 1. (There's no use in faceting by an attribute
with a cardinality of 1, you will just get teh identical data. So just show the single for that attribute.)

