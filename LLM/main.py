# from fastapi import FastAPI
# import json
# from transformers import FlaxAutoModelForSeq2SeqLM
# from transformers import AutoTokenizer

# app = FastAPI()

# @app.get('/')
# async def ha(s: str):
#     MODEL_NAME_OR_PATH = "JustAPR/resGen"
#     tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME_OR_PATH, use_fast=True)
#     model = FlaxAutoModelForSeq2SeqLM.from_pretrained(MODEL_NAME_OR_PATH)

#     prefix = "items: "
#     generation_kwargs = {
#         "max_length": 512,
#         "min_length": 64,
#         "no_repeat_ngram_size": 4,
#         "do_sample": True,
#         "top_k": 60,
#         "top_p": 0.95
#     }


#     special_tokens = tokenizer.all_special_tokens
#     tokens_map = {
#         "<sep>": "--",
#         "<section>": "\n"
#     }
#     def skip_special_tokens(text, special_tokens):
#         for token in special_tokens:
#             text = text.replace(token, "")

#         return text

#     def target_postprocessing(texts, special_tokens):
#         if not isinstance(texts, list):
#             texts = [texts]

#         new_texts = []
#         for text in texts:
#             text = skip_special_tokens(text, special_tokens)

#             for k, v in tokens_map.items():
#                 text = text.replace(k, v)

#             new_texts.append(text)

#         return new_texts

#     def generation_function(texts):
#         _inputs = texts if isinstance(texts, list) else [texts]
#         inputs = [prefix + inp for inp in _inputs]
#         inputs = tokenizer(
#             inputs,
#             max_length=256,
#             padding="max_length",
#             truncation=True,
#             return_tensors="jax"
#         )

#         input_ids = inputs.input_ids
#         attention_mask = inputs.attention_mask

#         output_ids = model.generate(
#             input_ids=input_ids,
#             attention_mask=attention_mask,
#             **generation_kwargs
#         )
#         generated = output_ids.sequences
#         generated_recipe = target_postprocessing(
#             tokenizer.batch_decode(generated, skip_special_tokens=False),
#             special_tokens
#         )
#         return generated_recipe
    
#     items = []
#     items.append(s)
#     generated = generation_function(items)
#     def parse_recipe(recipe_str):
#         lines = recipe_str.split('\n')
#         recipe = {}
#         for line in lines:
#             key, value = line.split(':', 1)
#             recipe[key.strip()] = value.strip()
#         return recipe
#     parsed_recipes = [parse_recipe(recipe) for recipe in generated]
#     json_output = json.dumps(parsed_recipes, indent=4)
#     return json_output

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
from transformers import FlaxAutoModelForSeq2SeqLM, AutoTokenizer

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_NAME_OR_PATH = "JustAPR/resGen"
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME_OR_PATH, use_fast=True)
model = FlaxAutoModelForSeq2SeqLM.from_pretrained(MODEL_NAME_OR_PATH)

prefix = "items: "
generation_kwargs = {
    "max_length": 512,
    "min_length": 64,
    "no_repeat_ngram_size": 4,
    "do_sample": True,
    "top_k": 60,
    "top_p": 0.95
}

special_tokens = tokenizer.all_special_tokens
tokens_map = {
    "<sep>": "--",
    "<section>": "\n"
}

def skip_special_tokens(text, special_tokens):
    for token in special_tokens:
        text = text.replace(token, "")
    return text

def target_postprocessing(texts, special_tokens):
    if not isinstance(texts, list):
        texts = [texts]
    new_texts = []
    for text in texts:
        text = skip_special_tokens(text, special_tokens)
        for k, v in tokens_map.items():
            text = text.replace(k, v)
        new_texts.append(text)
    return new_texts

def generation_function(texts):
    _inputs = texts if isinstance(texts, list) else [texts]
    inputs = [prefix + inp for inp in _inputs]
    inputs = tokenizer(
        inputs,
        max_length=256,
        padding="max_length",
        truncation=True,
        return_tensors="jax"
    )
    input_ids = inputs.input_ids
    attention_mask = inputs.attention_mask

    output_ids = model.generate(
        input_ids=input_ids,
        attention_mask=attention_mask,
        **generation_kwargs
    )
    generated = output_ids.sequences
    generated_recipe = target_postprocessing(
        tokenizer.batch_decode(generated, skip_special_tokens=False),
        special_tokens
    )
    return generated_recipe

@app.get('/')
async def ha(s: str):
    items = [s]
    generated = generation_function(items)
    def parse_recipe(recipe_str):
        lines = recipe_str.split('\n')
        recipe = {}
        for line in lines:
            key, value = line.split(':', 1)
            recipe[key.strip()] = value.strip()
        return recipe
    parsed_recipes = [parse_recipe(recipe) for recipe in generated]
    json_output = json.dumps(parsed_recipes, indent=4)
    return json_output

