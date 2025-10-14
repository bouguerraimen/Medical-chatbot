from pinecone.grpc import PineconeGRPC as Pinecone
from pinecone import ServerlessSpec
from langchain_pinecone import  PineconeVectorStore
import os
from dotenv import load_dotenv
from src.helper  import load_pdf_file,text_split,downloading_hugging_face_embeddings
load_dotenv()
PINECONE_API_KEY = os.environ.get("PINECONE_API_KEY")
os.environ["PINECONE_API_KEY"]=PINECONE_API_KEY
extracted_data=load_pdf_file(data="Data/")
text_chunks=text_split(extracted_data)
embeddings = downloading_hugging_face_embeddings()
pc = Pinecone(api_key=os.environ["PINECONE_API_KEY"])
index_name="medicalbot"
pc.create_index(
        name=index_name,
        dimension=384,
        metric="cosine",
        spec=ServerlessSpec(
            cloud="aws",
            region="us-east-1"
        )
    )
docsearch=PineconeVectorStore.from_documents(
    documents=text_chunks,
    index_name=index_name,
    embedding=embeddings,
)