# Creating styles

Generally, you do not edit sbstyles.css directly. That file is for built styles.

All styling files are located in /styling.
Style files are categorized into two different categories; general and components.
Files in General typically do not get the %CR replacement, files in components do.
So keep all non component styling in general.

To properly create styles, name the css file after the component
in such a way that
block_component or block would be called `block.css`

After creating the file, to reference the component, type %CR.

An example of such would be
```
%CR {
    background-color: azure;
}
```

You should **ALWAYS** start component styling with %CR as we do not want component styling flooding over to other components
or worse, ruining the site owner's page.

**SBSTYLES_ROOT.css is the file that you put general styles in!**
**IN ADDITION: Always remember to build the styles after modifying them!**

## Reusable themes

Use the `--sb-*` properties in `SBSTYLES_ROOT.css` rather than hardcoding colors.
This is important because people want to change their page colors, and themes generally shouldn't look specifically made for x person / brand.

Themes should lean towards modern though, maybe they could include variants some day, such as x device native styling.
If you as a contributor wish to help with these variants, mark them with `[data-sb-variant="variantname"]`.

# Building
In order to properly build sbstyles.css, run the following command from the repo folder root:
```
python3 scripts/stylebuilder.py
```