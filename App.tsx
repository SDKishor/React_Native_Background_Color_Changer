import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

export default function App() {
  const [bgColor, setBgColor] = useState("")
  const [favbgColor, setFavbgColor] = useState("")
  const [favColor, setFavColor] = useState<string[]>([])
  const [itemNum, setItemNum] = useState(0)


  const generateBgColor=()=>{
    const colorChar = "01C23E45B67D89AF"
    let HaxColor = "#"

    for (let i = 0; i < 6; i++) {
      const randomNum = Math.round(Math.random() * 15)
      HaxColor += colorChar[randomNum]
      
    }
    setBgColor(HaxColor)
  }

  const addToFavorite = () =>{
    let temp = favColor
    if(!temp.includes(bgColor)){
      temp.push(bgColor)
      setFavColor(temp)
      setItemNum(itemNum+1)
      setFavbgColor(bgColor)
    }
  }

  const removeFromFavorite = (color:string) =>{
    let temp = favColor
    
    let a = temp.filter((item)=>{
      return item !== color
    })
    setFavColor(a)
    setItemNum(itemNum-1)
    
  }


  const chageBg =(color:string)=>{
    setBgColor(color)
  }


  useEffect(() => {
    generateBgColor()
  }, [])
  
  

  return (
    <SafeAreaView style={[styles.mainContainer, {backgroundColor: bgColor}]}>
      <StatusBar backgroundColor={bgColor}/>
      <View style={styles.upperContainer}>
        <Text selectable style={styles.headingText}>{bgColor}</Text>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.button1} onPress={generateBgColor}>
          <Text style={styles.buttonText1}>Change Color</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button1} onPress={addToFavorite}>
          <Text style={styles.buttonText1}>Add to Favorite</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.lowerContainer}>
        <Text style={styles.favHeadingText}>My Favorites</Text>
        <View style={styles.favItemContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} >
          { (itemNum > 0) &&
              favColor.map((item, index)=>(
                <View key={index} style={styles.btnContainer2}>
                  <View >
                    <TouchableOpacity
                  style={[styles.favItem,{backgroundColor:item}]}
                  onPress={()=>chageBg(item)}
                 ></TouchableOpacity>
                  </View>
                  <View>
                    <TouchableOpacity onPress={()=>removeFromFavorite(item)}><Text style={styles.btnText3}>X</Text></TouchableOpacity>
                  </View>
                 
                 </View>
              ))
          }
        </ScrollView>
        </View>
        
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContainer:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    width:"100%"
  },
  btnContainer:{
    display:'flex',
    flexDirection:"row",
    gap:15
  },
  button1:{
    backgroundColor:"#00000050",
    paddingHorizontal:30,
    paddingVertical:10,
    borderRadius:5
  },
  buttonText1:{
    color:"#ffffffa0",
    fontWeight:'bold'
  },
  headingText:{
    marginBottom:20,
    fontSize:30,
    fontWeight:'bold',
    color:"#ffffffa0",

  },
  upperContainer:{
    display:'flex',
    flex:2,
    justifyContent:"flex-end",
    alignItems:"center",
    marginBottom:10,
    
  },
  lowerContainer:{
    display:'flex',
    flex:1,
    width:"100%",
    paddingHorizontal:20,
    marginTop:20,
  },
  favHeadingText:{
    marginBottom:10,
    fontSize:24,
    fontWeight:'bold',
    color:"#ffffffa0",
  },
  favItemContainer:{
    height:80,
    display:'flex',
    
  },
  btnContainer2:{
    marginRight:10,
    display:"flex",
    flex:1,
    justifyContent:"center",
    alignItems:"center",
  },
  favItem:{
    width:50,
    height:50,
    borderRadius:50/2,
    shadowColor: "#000",
    shadowOffset: {
	  width: 0,
	  height: 1,
    },
    shadowOpacity: 0.27,
    shadowRadius: 3.65,
    elevation: 4,
    borderColor: "#ffffff90",
    borderWidth:2,
    marginBottom:5,
  },
  btnText3:{
    width:20,
    height:20,
    fontSize:8,
    textAlign:"center",
    backgroundColor:"red",
    padding:5,
    color:"#ffffff9a",
    fontWeight:"bold",
    borderRadius:50,
  }
})