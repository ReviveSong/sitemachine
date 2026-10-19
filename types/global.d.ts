type content_item = Object;
type data = Object;
type metadata = [type: string, content: string]

interface map {
    content: [content_item];
    data: data;
    metadata: metadata;
}

// Var

type StringMap = {[key: string]: string};