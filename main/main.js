"use strict";
function buildInput(tags) {
    let receipItem=loadAllItems();
    let len=receipItem[0].barcode.length;
    let newTags=[];
    let counts=0;
    let countss=0;
    let promotion=loadPromotions();
    for(let index=0;index<receipItem.length;index++){
        for(let index1=0;index1<tags.length;index1++){
            if(tags[index1].length===len){
                if(receipItem[index].barcode===tags[index1]){
                    counts++;

                }
                else{
                    receipItem[index].count=0;
                }
            }

               else{ let list = tags[index1].split("-");
                if (receipItem[index].barcode === list[0]) {
                    countss = parseFloat(list[1]);
                }
                else{
                    receipItem[index].count=0;
                }

            }

        }
      receipItem[index].count=counts+countss;
        counts=0;
        countss=0;
    }
    for(let index2=0;index2<receipItem.length;index2++) {
        if (receipItem[index2].count >= 2) {
            if (receipItem[index2].barcode === promotion[0].barcodes[0] || promotion[0].barcodes[1] || promotion[0].barcodes[2] ) {
                newTags.push({
                    barcode:receipItem[index2].barcode,
                    name:receipItem[index2].name,
                    unit:receipItem[index2].unit,
                    price:receipItem[index2].price,
                    count:receipItem[index2].count,
                    subTotal:(receipItem[index2].count-1)*receipItem[index2].price,
                    save:receipItem[index2].price
                });

            }
            else{
                newTags.push({
                    barcode:receipItem[index2].barcode,
                    name:receipItem[index2].name,
                    unit:receipItem[index2].unit,
                    price:receipItem[index2].price,
                    count:receipItem[index2].count,
                    subTotal:receipItem[index2].count*receipItem[index2].price,
                    save:0
                });


            }
        }
        else if(receipItem[index2].count===1){
            newTags.push({
                barcode:receipItem[index2].barcode,
                name:receipItem[index2].name,
                unit:receipItem[index2].unit,
                price:receipItem[index2].price,
                count:receipItem[index2].count,
                subTotal:receipItem[index2].price,
                save:0
            });
        }
    }
return newTags ;}
function buildSingleItem(newTag) {
    return `商品编码:${newTag.barcode}，名称:${newTag.name}，数量:${newTag.count}${newTag.unit}，单价:${newTag.price.toFixed(2)}(元)，小计:${newTag.subTotal.toFixed(2)}(元)`;

}
function  printReceipt() {
    let newTags=buildInput(tags);
    let itemString="";
    let total=0;
    let save1=0;
    for(let k=0;k<newTags.length;k++){
        if(k!=newTags.length-1){
            itemString+=buildSingleItem(newTags[k])+"\n";
        }
        else{
            itemString+=buildSingleItem(newTags[k]);
        }
        total+=newTags[k].subTotal;
        save1+=newTags[k].save
    }
    console.log( `***<没钱赚商店>收据***
${itemString}
----------------------
总计：${total.toFixed(2)}(元)
节省：${save1.toFixed(2)}(元)
**********************`);
}
console.log(printReceipt());

