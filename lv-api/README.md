# SbPedia Guideline for Developer

A skeleton for creating applications with [CakePHP](https://cakephp.org) 4.x.

The framework source code can be found here: [cakephp/cakephp](https://github.com/cakephp/cakephp).

## Cloning & Installation Commands

1. Clone The project: 
```bash
    git clone https://grameentechnology@dev.azure.com/grameentechnology/sbpedia_24/_git/sbpedia_24
```

2. composer install :
```bash
    composer install
```
```bash
    composer update
```

3. Dyno:
```bash
    composer dumpautoload
```

4. run project into local:
```bash
    bin/cake server
```

5. Linking an image: 
```bash
    <?php echo $this->Html->image('img_path', ['alt' => 'alt_text']); ?>
```

6. Link Url: 
```bash
    <?= $this->Html->link(__('Button Title'), ['action' => 'method_name'], ['class' => 'css_class']) ?>
```

```bash
    <?= $this->Html->link(__('View'), ['plugin' => 'plugin_name', 'controller' => 'Controller_name', 'action' => 'method_name'], ['class' => 'css_class']) ?>
```