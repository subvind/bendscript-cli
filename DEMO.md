
# create a new bendscript file (input.bs)
```typescript
(function () {
  return "Hello World!";
})()
```

# transpile file
```bash
telebend -i input.bs -o output.bend
```

# run new file
```bash
bend run ./output.bend
```