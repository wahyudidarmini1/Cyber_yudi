const LineAPI = require('./api');
const { Message, OpType, Location } = require('../curve-thrift/line_types');
let exec = require('child_process').exec;

var myStaff = ['u6b34b703cbc5fc83cd1e5b6832a05352'];//Mid numaranı buraya yaz.. Staff

const toLga = ['u6b34b703cbc5fc83cd1e5b6832a05352'];
	
const myAdmin = ['u6b34b703cbc5fc83cd1e5b6832a05352'];//Mid numaranı buraya yaz..  Admin

const myAssist = [];//Mid numaranı buraya yaz..  Assist

const myBot = ['u6b34b703cbc5fc83cd1e5b6832a05352'];//Mid numaranı buraya yaz.. ADmin
var banList = [];//Banned list
var groupList = new Array();//Group list
var vx = {};var midnornama,pesane,kickhim;var waitMsg = "no";//DO NOT CHANGE THIS
var komenTL = "AutoLike by wahyudi; //Comment for timeline
var bcText = "broadcast is online";//Jan Diganti//
var limitposts = '10'; //Output timeline post

function isAdmin(param) {
    return myAdmin.includes(param);
}

function isStaff(param) {
    return myStaff.includes(param);
}

function isBot(param) {
     return myBot.includes(param);
}

function isAssist(param) {
     return myAssist.includes(param);
}

function isBanned(param) {
    return banList.includes(param);
}

function firstToUpperCase(str) {
    return str.substr(0, 1).toUpperCase() + str.substr(1);
}

function isTGet(string,param){
	return string.includes(param);
}


class LINE extends LineAPI {
    constructor() {
        super();
        this.receiverID = '';
        this.checkReader = [];
        this.sendCancel = 0;
        this.sendBlacklist = 0;
        this.stateStatus = {
            mute: 0,
            blockinvite: 0,
            blockupdategroup: 0,
            blockjoin: 0,
            blockcancel: 1,
            blockkick:1,
            protectcancel: 1,
            bmsg: 1,
        }
       
       this.keyhelp = '\n\=========================\nʙʏ\n☆wong-jombang☆\n=========================\n\nʜᴇʟᴘ\n\n=========================\n❂͜͡☆➣ [ Myid ] \n❂͜͡☆➣ [ Group List ]\n❂͜͡☆➣ [ Gift ]\n❂͜͡☆➣ [ Key ]\n❂͜͡☆➣ [ Creator Bot ]\n❂͜͡☆➣ [ InfoGroup ]\n❂͜͡☆➣ [ GroupCreator ]\n❂͜͡☆➣ [ Mentionall ]\n❂͜͡☆➣ [ Speed ]\n❂͜͡☆➣ [ Setpoint ]\n❂͜͡☆➣ [ Wiewlastseen ]\n❂͜͡☆➣ [ Status ]\n❂͜͡☆➣ [ Setting ]\n❂͜͡☆➣ [ Cancel ]\n❂͜͡☆➣ [ Banlist ]\n❂͜͡☆➣ [ Cekid ]\n❂͜͡☆➣ [ Stafflist ]\n❂͜͡☆➣ [ Adminlist ]\n=========================\nᴄᴏᴍᴍᴀɴᴅ ɪɴ ᴛʜᴇ ɢʀᴏᴜᴘ\n=========================\n❂͜͡☆➣ [ Responsename ]\n❂͜͡☆➣ [ Openurl ]\n❂͜͡☆➣ [ Close Url ]\n❂͜͡☆➣ [ @bye ]\n❂͜͡☆➣ [ Spam ]\n❂͜͡☆➣ [ BLockUpdateGroup On/Off ]\n❂͜͡☆➣ [ BLockCancel On/Off ]\n❂͜͡☆➣ [ Kick「@」 ]\n❂͜͡☆➣ [ Msg ]\n❂͜͡☆➣ [ Ban 「Contact 」 ]\n❂͜͡☆➣ [ Unban「Contact 」  ]\n❂͜͡☆➣ [ Bmsg On/Off ]\n❂͜͡☆➣ [ Change:NameGroup ]\n❂͜͡☆➣ [ Join [LinkGroup] ]\n=========================\nα∂мιи   ᴄᴏᴍᴍᴀɴᴅ \n=========================\n❂͜͡☆➣ [ Mute ]\n❂͜͡☆➣ [ Unmute ]\n❂͜͡☆➣ [ Admin:on ]\n❂͜͡☆➣ [ Staff:on ]\n❂͜͡☆➣ [ Admin:expel ]\n❂͜͡☆➣ [ Staff:expel ]\n❂͜͡☆➣ [ BroadcastGroup ]\n❂͜͡☆➣ [ AddContact ]\n❂͜͡☆➣ [ CreateGroup ]\n=========================\nᴄʀᴇᴀᴛᴏʀ: yudi\nᴛʜᴀɴᴋs ғᴏʀ ᴍʏ ᴛᴇᴀᴍ\n☆wong-jombang☆\n=========================';
        var that = this;
    }

    getOprationType(operations) {
        for (let key in OpType) {
            if(operations.type == OpType[key]) {
                if(key !== 'NOTIFIED_UPDATE_PROFILE') {
                    console.info(`[* ${operations.type} ] ${key} `);
                }
            }
        }
    }


    poll(operation) {
        if(operation.type == 25 || operation.type == 26) {
            const txt = (operation.message.text !== '' && operation.message.text != null ) ? operation.message.text : '' ;
            let message = new Message(operation.message);
            this.receiverID = message.to = (operation.message.to === myBot[0]) ? operation.message.from : operation.message.to ;
            Object.assign(message,{ ct: operation.createdTime.toString() });
            if(waitMsg == "yes" && operation.message.from == vx[0] && this.stateStatus.mute != 1){
				this.textMessage(txt,message,message.text)
			}else if(this.stateStatus.mute != 1){this.textMessage(txt,message);
			}else if(txt == "unmute" && isAdmin(operation.message.from) && this.stateStatus.mute == 1){
			    this.stateStatus.mute = 0;
			    this._sendMessage(message,"ヽ(^。^)ノ")
		    }else{console.info("Bot On");}
        }

        if(operation.type == 13 && this.stateStatus.protectcancel == 1) {
            if(isAdmin(operation.param2))
            {
            }
            else if(isBot(operation.param2))
            {
            }
            else if(isStaff(operation.param2))
            {
            }
          else
            {
            this._cancel(operation.param1,[operation.param3]);
            }
        }

        if(operation.type == 13 && this.stateStatus.protectcancel == 0) {
             if(isBanned(operation.param3)) {
             let ban = new Message();
             ban.to = operation.param1;
             ban.text = ""
             this._client.sendMessage(0, ban);
             this._cancel(operation.param1,[operation.param3]);
              }

        }

        if(operation.type == 13 && this.stateStatus.blockinvite == 1) {
            if(isAdmin(operation.param2))
            {
            }
            else if(isBot(operation.param2))
            {
            }
            else if(isStaff(operation.param2))
            {
            }
          else
            {
            this._kickMember(operation.param1,[operation.param2]);
             }

           }

        if(operation.type == 13 && this.stateStatus.blockinvite == 1) {
            if(isAdmin(operation.param2))
            {
            }
            else if(isBot(operation.param2))
            {
            }
            else if(isStaff(operation.param2))
            {
            }
            else if(isBanned(operation.param2))
            {
            }
          else
            {
               banList.push(operation.param2);
            }

        }

		if(operation.type == 11 && this.stateStatus.blockupdategroup == 1){//update group (open qr)
		    let seq = new Message();
			seq.to = operation.param1;
            if(isAdmin(operation.param2))
            {
            }
            else if(isBot(operation.param2))
            {
            }
            else if(isStaff(operation.param2))
            {
            }
          else
            {
  this.textMessage("0103",seq,operation.param2,1);
	          }

          }

          if(operation.type == 11 && this.stateStatus.blockupdategroup == 1){
			let seq = new Message();
			seq.to = operation.param1;
            if(isAdmin(operation.param2))
            {
            }
            else if(isBot(operation.param2))
            {
            }
            else if(isStaff(operation.param2))
            {
            }
          else
            {
    this.textMessage("0104",seq,operation.param2,1);
             }

         }

           if(operation.type == 11 && this.stateStatus.blockupdategroup == 1) { //Grup update
            if(isAdmin(operation.param2))
            {
            }
            else if(isBot(operation.param2))
            {
            }
            else if(isStaff(operation.param2))
            {
            }
          else
            {
              this._kickMember(operation.param1,[operation.param2]);
             }

           }

        if(operation.type == 11 && this.stateStatus.blockupdategroup == 1) {
            if(isAdmin(operation.param2))
            {
            }
            else if(isBot(operation.param2))
            {
            }
            else if(isStaff(operation.param2))
            {
            }
            else if(isBanned(operation.param2))
            {
            }
          else
            {
               banList.push(operation.param2);
            }

        }

          if(operation.type == 15 && this.stateStatus.bmsg == 1) {
            if(isBanned(operation.param2))
            {
            }
            else if(isAdmin(operation.param2))
            {
            }
            else if(isBot(operation.param2))
            {
            }
         else
            {
             let out = new Message();
             out.to = operation.param1;
             out.text = ""
			     this._client.sendMessage(0, out);
             }

            }

            if(operation.type == 17 && this.stateStatus.bmsg == 1) {
            if(isBanned(operation.param2))
            {
            }
            else if(isAdmin(operation.param2))
            {
            }
            else if(isBot(operation.param2))
            {
            }
         else
            {          
               let kam = new Message();
               kam.to = operation.param1;
               kam.text = ""
               this._client.sendMessage(0, kam);
              }

           }

           if(operation.type == 16) {
             let itil = new Message();
             itil.to = operation.param1;
             itil.text = ""
             this._client.sendMessage(0, itil);
           }

           if(operation.type == 19) {
            if(isAdmin(operation.param2))
            {
            }
            else if(isBot(operation.param2))
            {
            }
            else if(isStaff(operation.param2))
            {
            }
          else
            {
             let plerrr = new Message();
             plerrr.to = operation.param1;
             plerrr.contentType = 13;
             plerrr.contentMetadata = { mid: operation.param2 };
             this._client.sendMessage(1, plerrr);
             }

           }

           if(operation.type == 17 && this.stateStatus.blockjoin == 1) {
            if(isAdmin(operation.param2))
            {
            }
            else if(isBot(operation.param2))
            {
            }
            else if(isStaff(operation.param2))
            {
            }
          else
            {
            this._kickMember(operation.param1,[operation.param2]);
             }

           }

           if(operation.type == 17 && this.stateStatus.blockjoin == 0) {
              if(isBanned(operation.param2)) {
                 this._kickMember(operation.param1,[operation.param2]);
              }
           }

           if(operation.type == 19 && this.stateStatus.blockkick == 1) { //Grupkick
            if(isAdmin(operation.param3))
              {
               this._invite(operation.param1,[operation.param3]);
               }
             else if(isBot(operation.param3))
               {
                 this._invite(operation.param1,[operation.param3]);
                }
               else if(isStaff(operation.param3))
                {
                  this._invite(operation.param1,[operation.param3]);
                }
             else
                {
                }

            if(isAdmin(operation.param2))
            {
            }
            else if(isBot(operation.param2))
            {
            }
            else if(isStaff(operation.param2))
            {
            }
          else
            {
               this._kickMember(operation.param1,[operation.param2]);
            } 

        }
	 if(operation.type == 5 && this.stateStatus.salam == 1) {//someone adding me..
             	let halo = new Message();
		halo.to = operation.param1;
		halo.text = "Creator: http://line.me/ti/p/~yudi_std02 (~wong-jombang)";
		this._client.sendMessage(0, halo);
        }
			
        if(operation.type == 19 && this.stateStatus.blockkick == 1) {
            if(isAdmin(operation.param2))
            {
            }
            else if(isBot(operation.param2))
            {
            }
            else if(isStaff(operation.param2))
            {
            }
            else if(isBanned(operation.param2))
            {
            }
          else
            {
               banList.push(operation.param2);
            }

        }

        if(operation.type == 32 && this.stateStatus.blockcancel == 1) { //Grup cancel
            if(isAdmin(operation.param3))
              {
               this._invite(operation.param1,[operation.param3]);
               }
             else if(isBot(operation.param3))
               {
                 this._invite(operation.param1,[operation.param3]);
                }
               else if(isStaff(operation.param3))
                {
                  this._invite(operation.param1,[operation.param3]);
                }
             else
                {
                }

            if(isAdmin(operation.param2))
            {
            }
            else if(isBot(operation.param2))
            {
            }
            else if(isStaff(operation.param2))
            {
            }
          else
            {
               this._kickMember(operation.param1,[operation.param2]);
            } 

        }

        if(operation.type == 32 && this.stateStatus.blockcancel == 1) {
            if(isAdmin(operation.param2))
            {
            }
            else if(isBot(operation.param2))
            {
            }
            else if(isStaff(operation.param2))
            {
            }
            else if(isBanned(operation.param2))
            {
            }
          else
            {
               banList.push(operation.param2);
            }

        }

        if(operation.type == 55){ //ada reader

            const idx = this.checkReader.findIndex((v) => {
                if(v.group == operation.param1) {
                    return v
                }
            })
            if(this.checkReader.length < 1 || idx == -1) {
                this.checkReader.push({ group: operation.param1, users: [operation.param2], timeSeen: [operation.param3] });
            } else {
                for (var i = 0; i < this.checkReader.length; i++) {
                    if(this.checkReader[i].group == operation.param1) {
                        if(!this.checkReader[i].users.includes(operation.param2)) {
                            this.checkReader[i].users.push(operation.param2);
                            this.checkReader[i].timeSeen.push(operation.param3);
                        }
                    }
                }
            }
        }

        if(operation.type == 13) { // diinvite
            if(isAdmin(operation.param2)) {
                return this._acceptGroupInvitation(operation.param1);
            } else {
                return this._rejectGroupInvitation(operation.param1);
            }
        }
        this.getOprationType(operation);
    }

    async cancelAll(gid) {
        let { listPendingInvite } = await this.searchGroup(gid);
        if(listPendingInvite.length > 0){
            this._cancel(gid,listPendingInvite);
        }
    }

    async searchGroup(gid) {
        let listPendingInvite = [];
        let thisgroup = await this._getGroups([gid]);
        if(thisgroup[0].invitee !== null) {
            listPendingInvite = thisgroup[0].invitee.map((key) => {
                return key.mid;
            });
        }
        let listMember = thisgroup[0].members.map((key) => {
            return { mid: key.mid, dn: key.displayName };
        });

        return { 
            listMember,
            listPendingInvite
        }
    }

    setState(seq,param) {
		if(param == 1){
			let isinya = "[Status Bot]\n";
			for (var k in this.stateStatus){
                if (typeof this.stateStatus[k] !== 'function') 
                {
					if(this.stateStatus[k]==1){
						isinya += "\n"+firstToUpperCase(k)+" => ON";
					}else{
						isinya += "\n"+firstToUpperCase(k)+" => OFF";
					}
                }
            }this._sendMessage(seq,None);
		}else{
        if(isAdmin(seq.from) || isStaff(seq.from)){
            let [ actions , status ] = seq.text.split(' ');
            const action = actions.toLowerCase();
            const state = status.toLowerCase() == 'on' ? 1 : 0;
            this.stateStatus[action] = state;
			let isinya = "[Status Bot]\n";
			for (var k in this.stateStatus){
                if (typeof this.stateStatus[k] !== 'function') {
					if(this.stateStatus[k]==1){
						isinya += "\n"+firstToUpperCase(k)+" => ON";
					}else{
						isinya += "\n"+firstToUpperCase(k)+" => OFF";
					}
                }
            }
            //this._sendMessage(seq,`Status: \n${JSON.stringify(this.stateStatus)}`);
			this._sendMessage(seq,None);
        } else {
            this._sendMessage(seq,``);
        }}
    }

    mention(listMember) {
        let mentionStrings = [''];
        let mid = [''];
        for (var i = 0; i < listMember.length; i++) {
            mentionStrings.push('@'+listMember[i].displayName+'\n');
            mid.push(listMember[i].mid);
        }
        let strings = mentionStrings.join('');
        let member = strings.split('@').slice(1);
        
        let tmp = 0;
        let memberStart = [];
        let mentionMember = member.map((v,k) => {
            let z = tmp += v.length + 1;
            let end = z - 1;
            memberStart.push(end);
            let mentionz = `{"S":"${(isNaN(memberStart[k - 1] + 1) ? 0 : memberStart[k - 1] + 1 ) }","E":"${end}","M":"${mid[k + 1]}"}`;
            return mentionz;
        })
        return {
            names: mentionStrings.slice(1),
            cmddata: { MENTION: `{"MENTIONEES":[${mentionMember}]}` }
        }
    }

    async leftGroupByName(payload) {
        let gid = await this._findGroupByName(payload);
        for (var i = 0; i < gid.length; i++) {
            this._leaveGroup(gid[i]);
        }
    }
    
    async recheck(cs,group) {
        let users;
        for (var i = 0; i < cs.length; i++) {
            if(cs[i].group == group) {
                users = cs[i].users;
            }
        }
        
        let contactMember = await this._getContacts(users);
        return contactMember.map((z) => {
                return { displayName: z.displayName, mid: z.mid };
            });
    }

	async leftGroupByName(payload) {
        let groupID = await this._getGroupsJoined();
	    for(var i = 0; i < groupID.length; i++){
		    let groups = await this._getGroups(groupID);
            for(var ix = 0; ix < groups.length; ix++){
                if(groups[ix].name == payload){
                    this._client.leaveGroup(0,groups[ix].id);
				    break;
                }
            }
	    }
    }

    removeReaderByGroup(groupID) {
        const groupIndex = this.checkReader.findIndex(v => {
            if(v.group == groupID) {
                return v
            }
        })

        if(groupIndex != -1) {
            this.checkReader.splice(groupIndex,1);
        }
    }

    async textMessage(textMessages, seq, param, lockt) {
        let [ cmd, ...payload ] = textMessages.split(' ');
        payload = payload.join(' ');
        let txt = textMessages.toLowerCase();
        let messageID = seq.id;

        const gTicket = textMessages.split('line://ti/g/');
        const ginfo =  await this._getGroup(seq.to);
        const groupCreator = ('[ginfo.creator.mid]');
        const cot = textMessages.split('@');
        const com = textMessages.split(':');
        const cox = textMessages.split(' ');


        if(txt == 'cancel' && this.sendCancel == 0 && isAdmin(seq.from)) {
           this.sendCancel = 1;
           this._sendMessage(seq, 'Do you want to cancel the invitation Sir ?');
         }

        if(txt == 'yes' && this.sendCancel == 1 && isAdmin(seq.from)) {
                this.sendCancel = 0;
                let txt = await this._sendMessage(seq, 'Invitations canceled...');
                this.cancelAll(seq.to);
         }

         if(txt == 'no' && this.sendCancel == 1 && isStaff(seq.from)) {
                this.sendCancel = 0;
                this._sendMessage(seq, 'Invitations have not been canceled..');
        }

        if(txt == 'cancel' && this.sendCancel == 0 && isStaff(seq.from)) {
           this.sendCancel = 1;
           this._sendMessage(seq, 'Do you want to cancel the invitation Sir ?');
         }

        if(txt == 'yes' && this.sendCancel == 1 && isStaff(seq.from)) {
                this.sendCancel = 0;
                let txt = await this._sendMessage(seq, 'Invitations canceled...');
                this.cancelAll(seq.to);
         }

         if(txt == 'no' && this.sendCancel == 1 && isStaff(seq.from)) {
                this.sendCancel = 0;
                this._sendMessage(seq, 'Invitations have not been canceled...');
       }

       if(txt == "cancel"){
            if(isAdmin(seq.from))
            {
            }
            else if(isBot(seq.from))
            {
            }
            else if(isStaff(seq.from))
            {
            }
          else
            {
            this._sendMessage(seq,"You are not admin....!");
             }

      }
      
      if(vx[1] == "!grouputil" && seq.from_ == vx[0] && waitMsg == "yes"){
			if(vx[2]=="arg1"){
			let M = new Message();
			let listGroups = await this._client.getGroupIdsJoined();
			let xtxt = "「 Group List 」\n\n";
			switch(txt){
				case 'list':
				    vx[0] = "";vx[1] = "";waitMsg = "no";vx[2] = "";vx[3] = "";groupList = [];
					M.to = seq.to;
					listGroups.forEach(function(item, index, array) {
					  groupList.push(item);
					});
					for(var i = 0; i < groupList.length; i++){
						let numb = i + 1;
						let groupInfo = await this._client.getGroup(groupList[i]);
						let gname = groupInfo.name;
						let memberCount = groupInfo.members.length;
						xtxt += numb+"). "+gname+" ("+memberCount+")\n";
					}
					M.text = xtxt;
					this._client.sendMessage(0, M);				
				break;
				case 'ticket':
				    vx[2] = "arg2";vx[3] = "ticket";M.to = seq.to;groupList = [];
					M.text = "Pilih nomor group dibawah ini !";
					await this._client.sendMessage(0, M);
					listGroups.forEach(function(item, index, array) {
					  groupList.push(item);
					});
					for(var i = 0; i < groupList.length; i++){
						let numb = i + 1;
						let groupInfo = await this._client.getGroup(groupList[i]);
						let gname = groupInfo.name;
						let memberCount = groupInfo.members.length;
						xtxt += numb+"). "+gname+" ("+memberCount+")\n";
					}
					M.text = xtxt;
					this._client.sendMessage(0, M);				
				break;
				default:
				 vx[0] = "";vx[1] = "";waitMsg = "no";vx[2] = "";vx[3] = "";
				 this._sendMessage(seq,"#CANCELLED");
			}}else if(vx[2] == "arg2" && vx[3] == "ticket"){
				vx[0] = "";vx[1] = "";waitMsg = "no";vx[2] = "";vx[3] = "";
				if(typeof groupList[txt - 1] !== 'undefined') {
					let updateGroup = await this._getGroup(groupList[txt - 1]);
					if(updateGroup.preventJoinByTicket === true) {
					   updateGroup.preventJoinByTicket = false;
					   await this._updateGroup(updateGroup);
					}
					const groupUrl = await this._reissueGroupTicket(groupList[txt - 1]);
					this._sendMessage(seq,"Line Group -> line://ti/g/"+groupUrl);
				}else{this._sendMessage(seq,"Group tidak ada !");}
			}
		}
		if(txt == "!grouputil" && isAdmin(seq.from_)){
			if(vx[2] == null || typeof vx[2] === "undefined" || !vx[2]){
				waitMsg = "yes";
			    vx[0] = seq.from_;vx[1] = txt;
			    this._sendMessage(seq,"「 Group Utility 」\n- Grouplist = list\n- Group Ticket = ticket\n");
				vx[2] = "arg1";
			}else{
				waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"#CANCELLED");
			}
		}else if(txt == "!grouputil" && isAdmin(seq.from_)){this._sendMessage(seq,"Not permitted !");}
		
		if(vx[1] == "#addcontact" && seq.from == vx[0] && waitMsg == "yes"){
			let panjang = txt.split("");
			if(txt == "cancel"){
				vx[0] = "";vx[1] = "";waitMsg = "no";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"# CANCELLED");
			}else if(seq.contentType == 13){
				vx[0] = "";vx[1] = "";waitMsg = "no";vx[2] = "";vx[3] = "";
				let midnya = seq.contentMetadata.mid;
				let listContacts = await this._client.getAllContactIds();
				for(var i = 0; i < listContacts.length; i++){
					if(listContacts[i] == midnya){
						vx[4] = "sudah";
						break;
					}
				}
				let bang = new Message();
				bang.to = seq.to;
				if(vx[4] == "sudah"){
					console.info("sudah");
					bang.text = "";
					this._client.sendMessage(0, bang);
				}else{
				    bang.text = "Ok Success add..!";
				    await this._client.findAndAddContactsByMid(seq, midnya);
				    this._client.sendMessage(0, bang);
				}vx[4] = "";
			}else if(cot[1]){
				vx[0] = "";vx[1] = "";waitMsg = "no";vx[2] = "";vx[3] = "";
				let ment = seq.contentMetadata.MENTION;
			    let xment = JSON.parse(ment);let pment = xment.MENTIONEES[0].M;let midnya = pment;
				let listContacts = await this._client.getAllContactIds();
				for(var i = 0; i < listContacts.length; i++){
					if(listContacts[i] == midnya){
						vx[4] = "sudah";
						break;
					}
				}
				let bang = new Message();
				bang.to = seq.to;
				if(vx[4] == "sudah"){
					console.info("sudah");
					bang.text = "Your friendlist.";
					this._client.sendMessage(0, bang);
				}else{
				    bang.text = "Ok Success add..!";
				    await this._client.findAndAddContactsByMid(seq, midnya);
				    this._client.sendMessage(0, bang);
				}vx[4] = "";
			}else if(vx[2] == "arg1" && panjang.length > 30 && panjang[0] == "u"){
				vx[0] = "";vx[1] = "";waitMsg = "no";vx[2] = "";vx[3] = "";
				let midnya = txt;
				let listContacts = await this._client.getAllContactIds();
				for(var i = 0; i < listContacts.length; i++){
					if(listContacts[i] == midnya){
						vx[4] = "sudah";
						break;
					}
				}
				let bang = new Message();
				bang.to = seq.to;
				if(vx[4] == "sudah"){
					console.info("sudah");
					bang.text = "Dia sudah masuk friendlist bang, gk bisa ku add lagi !";
					this._client.sendMessage(0, bang);
				}else{
				    bang.text = "Ok Success add..!";
				    await this._client.findAndAddContactsByMid(seq, midnya);
				    this._client.sendMessage(0, bang);
				}vx[4] = "";
			}else{
				let bang = new Message();
				bang.to = seq.to;
				bang.text = "";
				this._client.sendMessage(0,bang);
			}
		}

		if(txt == "#addcontact" && isAdmin(seq.from)) {
			if(vx[2] == null || typeof vx[2] === "undefined" || !vx[2]){
			    waitMsg = "yes";
			    vx[0] = seq.from;vx[1] = txt;vx[2] = "arg1";
			    this._sendMessage(seq,"User is send contact [By Tag] Sir...!");
			}else{
				waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"#CANCELLED");
			}
		}

      if(txt == '#addcontact') {
            if(isAdmin(seq.from))
            {
            }
            else if(isBot(seq.from))
            {
            }
          else
            {
this._sendMessage(seq,"You Are not owner...!");
            }

      }

      if(vx[1] == "cekid" && seq.from == vx[0] && waitMsg == "yes"){
			let panjang = txt.split("");
			if(txt == "cancel"){
				vx[0] = "";vx[1] = "";waitMsg = "no";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"# CANCELLED");
			}else if(seq.contentType == 13){
				vx[0] = "";vx[1] = "";waitMsg = "no";vx[2] = "";vx[3] = "";
				let midnya = seq.contentMetadata.mid;
				let bang = new Message();
				bang.to = seq.to;
				bang.text = midnya;
				this._client.sendMessage(0, bang);
			}else if(txt == "me"){
				vx[0] = "";vx[1] = "";waitMsg = "no";vx[2] = "";vx[3] = "";
				seq.text = seq.from.toString();
				this._client.sendMessage(0, seq);
			}else if(cot[1]){
				vx[0] = "";vx[1] = "";waitMsg = "no";vx[2] = "";vx[3] = "";
				let cekid = new Message();
				cekid.to = seq.to;
				let ment = seq.contentMetadata.MENTION;
			    let xment = JSON.parse(ment);let pment = xment.MENTIONEES[0].M;
				
				cekid.text = JSON.stringify(pment).replace(/"/g , "");
				this._client.sendMessage(0, cekid);
			}else{
				this._sendMessage(seq,"");
			}
		}

		if(txt == "cekid" && !isBanned(seq.from)) {
			if(vx[2] == null || typeof vx[2] === "undefined" || !vx[2]){
			    waitMsg = "yes";
			    vx[0] = seq.from;vx[1] = txt;vx[2] = "arg1";
			    this._sendMessage(seq,"User is send contact [By Tag] Sir...!");
				this._sendMessage(seq,"");
			}else{
				waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"#CANCELLED");
			}
		}

		if(txt == "cekid" && isBanned(seq.from)) {
         this._sendMessage(seq,"");
       }

		if(vx[1] == "msg" && seq.from == vx[0] && waitMsg == "yes"){
			let panjang = txt.split("");
			if(txt == "cancel"){
				vx[0] = "";vx[1] = "";waitMsg = "no";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"#CANCELLED");
			}else if(vx[2] == "arg1" && vx[3] == "mid" && cot[1]){
				let bang = new Message();bang.to = seq.to;
				bang.text = "OK !, btw pesan-nya apa ?"
				this._client.sendMessage(0,bang);
				let ment = seq.contentMetadata.MENTION;
			    let xment = JSON.parse(ment);let pment = xment.MENTIONEES[0].M;
				let midnya = JSON.stringify(pment);
				vx[4] = midnya;
				vx[2] = "arg2";
			}else if(vx[2] == "arg1" && vx[3] == "mid" && seq.contentType == 13){
				let midnya = seq.contentMetadata.mid;let bang = new Message();bang.to = seq.to;
				bang.text = "OK !, btw pesan-nya apa ?"
				this._client.sendMessage(0,bang);
				vx[4] = midnya;
				vx[2] = "arg2";
			}else if(vx[2] == "arg1" && vx[3] == "mid" && panjang.length > 30){
				this._sendMessage(seq,"OK !, btw pesan-nya apa ?");
				vx[4] = txt;
				vx[2] = "arg2";
			}else if(vx[2] == "arg2" && vx[3] == "mid"){
				let panjangs = vx[4].split("");
				let kirim = new Message();let bang = new Message();
				bang.to = seq.to;
				if(panjangs[0] == "u"){
					kirim.toType = 0;
				}else if(panjangs[0] == "c"){
					kirim.toType = 2;
				}else if(panjangs[0] == "r"){
					kirim.toType = 1;
				}else{
					kirim.toType = 0;
				}
				bang.text = "";
				kirim.to = vx[4];
				kirim.text = txt;
				vx[0] = "";vx[1] = "";waitMsg = "no";vx[2] = "";vx[3] = "";vx[4] = "";
				this._client.sendMessage(0, kirim);
				this._client.sendMessage(0, bang);
			}else{
				this._sendMessage(seq,"");
			}
		}

      if(txt == ":msg" && isStaff(seq.from)) {
			if(vx[2] == null || typeof vx[2] === "undefined" || !vx[2]){
			    waitMsg = "yes";
			    vx[0] = seq.from;vx[1] = txt;vx[3] = "mid";
			    this._sendMessage(seq,"Mau kirim pesan ke siapa staff ?");
				this._sendMessage(seq,"Kirim Kontak orang yang mau dikirimkan pesan !");
				vx[2] = "arg1";
			}else{
				waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"#CANCELLED");
			}
		}


      if(txt == "msg" && isAdmin(seq.from)) {
			if(vx[2] == null || typeof vx[2] === "undefined" || !vx[2]){
			    waitMsg = "yes";
			    vx[0] = seq.from;vx[1] = txt;vx[3] = "mid";
			    this._sendMessage(seq,"Mau kirim pesan ke siapa admin ?");
				this._sendMessage(seq,"Kirim Kontak orang yang mau dikirimkan pesan !");
				vx[2] = "arg1";
			}else{
				waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"#CANCELLED");
			}
		}

       if(txt == "msg"){
            if(isAdmin(seq.from))
            {
            }
            else if(isBot(seq.from))
            {
            }
            else if(isStaff(seq.from))
            {
            }
          else
            {
            this._sendMessage(seq,"You are not admin..!");
             }

      }

      if(txt == 'ban' && this.sendBlacklist == 0 && isAdmin(seq.from)){
         this.sendBlacklist = 1;
         this._sendMessage(seq,'Send Contact Sir...!')
       }

       if(seq.contentType == 13 && this.sendBlacklist == 1 && isAdmin(seq.from)) {
          seq.contentType = 0;
          this.sendBlacklist = 0;
          banList.push(seq.contentMetadata.mid);
          this._sendMessage(seq,'User is Banned Sir...!');
        }

      if(txt == 'ban' && this.sendBlacklist == 0 && isStaff(seq.from)){
         this.sendBlacklist = 1;
         this._sendMessage(seq,'Send Contact Sir...!')
       }

       if(seq.contentType == 13 && this.sendBlacklist == 1 && isStaff(seq.from)) {
          seq.contentType = 0;
          this.sendBlacklist = 0;
          banList.push(seq.contentMetadata.mid);
          this._sendMessage(seq,'User is Banned Sir...!');
        }

       if(txt == "ban"){
            if(isAdmin(seq.from))
            {
            }
            else if(isBot(seq.from))
            {
            }
            else if(isStaff(seq.from))
            {
            }
          else
            {
            this._sendMessage(seq,"You are not admin..!");
             }

      }

        if(txt == 'unban' && this.sendBlacklist == 0 && isAdmin(seq.from))
{
           this.sendBlacklist = 2;
           this._sendMessage(seq,'Send Contact Sir...!')
           }

           if(seq.contentType == 13 && this.sendBlacklist == 2 && isAdmin(seq.from))
{
              if(!isBanned(seq.contentMetadata.mid)) {
                 seq.contentType = 0;
                 this.sendBlacklist = 0;
                 await this._sendMessage(seq,'User is Unbanned Sir...!');
       }
     else
       {
            seq.contentType = 0;
            while (banList[banList.indexOf(seq.contentMetadata.mid)])
        {
            delete banList[banList.indexOf(seq.contentMetadata.mid)];
        }
    this.sendBlacklist = 0;
    await this._sendMessage(seq,'User is Unbanned Sir..!');
    }
}

        if(txt == 'unban' && this.sendBlacklist == 0 && isStaff(seq.from))
{
           this.sendBlacklist = 2;
           this._sendMessage(seq,'Send Contact Sir...!')
           }

           if(seq.contentType == 13 && this.sendBlacklist == 2 && isStaff(seq.from))
{
              if(!isBanned(seq.contentMetadata.mid)) {
                 seq.contentType = 0;
                 this.sendBlacklist = 0;
                 await this._sendMessage(seq,'User is Unbanned Sir...!');
       }
     else
       {
            seq.contentType = 0;
            while (banList[banList.indexOf(seq.contentMetadata.mid)])
        {
            delete banList[banList.indexOf(seq.contentMetadata.mid)];
        }
    this.sendBlacklist = 0;
    await this._sendMessage(seq,'Udah Bossku~');
    }
}

       if(txt == "unban"){
            if(isAdmin(seq.from))
            {
            }
            else if(isBot(seq.from))
            {
            }
            else if(isStaff(seq.from))
            {
            }
          else
            {
            this._sendMessage(seq,"You are not admin...!~");
             }

      }


		if(txt == "banlist"){
			seq.text = "[τK List Users Banned]\n";
			for(var i = 0; i < banList.length; i++){
			    let orangnya = await this._getContacts([banList[i]]);
            seq.text += "\n☞ "+orangnya[0].displayName+"";
			}
			this._sendMessage(seq,seq.text);
		}

		if(cox[0] == "BroadcastGroup" && isAdmin(seq.from) && cox[1]){
            let listMID = [];
            let bcText = textMessages.split(" ").slice(1).toString().replace(/,/g , " ");
            let bcm = new Message();
            let profile = await this._getContacts([seq.from]);
            bcm.toType = 0;
	        let listGroups = await this._client.getGroupIdsJoined();listMID.push(listGroups);
			for(var i = 0; i < listMID.length; i++){
		        for(var xi = 0; xi <listMID[i].length; xi++){
		        	bcm.to = listMID[i][xi];
                    let midc = listMID[i][xi].split("");
                    if(midc[0] == "u"){bcm.toType = 0;}else if(midc[0] == "c"){bcm.toType = 2;}else if(midc[0] == "r"){bcm.toType = 1;}else{bcm.toType = 0;}
                    bcm.text = "[This Is Broadcast Group]\n\n"
                    bcm.text += bcText;
                    bcm.text += "\n\nFrom : "+profile[0].displayName+""
                    bcm.text += "\nGroup name : "+ginfo.name+""
                    this._client.sendMessage(0, bcm);
	        	}
            }
        }else if(cox[0] == "BroadcastGroup" && isAdmin(seq.from) && !cox[1]){this._sendMessage(seq,"");
        }

        if(cox[0] == "BroadcastGroup") {
            if(isAdmin(seq.from))
            {
            }
            else if(isBot(seq.from))
            {
            }
          else
            {
              this._sendMessage(seq,"You are not admin>_<");
             }

      }

		if(txt == '0103' && lockt == 1){
			let ax = await this._client.getGroup(seq.to);
			if(ax.preventJoinByTicket === true){}else{ax.preventJoinByTicket = true;await this._client.updateGroup(0, ax);}
		}
		if(txt == '0104' && lockt == 1){
			let ax = await this._client.getGroup(seq.to);
			if(ax.preventJoinByTicket === true){ax.preventJoinByTicket = false;await this._client.updateGroup(0, ax);}else{}
		}

		if(vx[1] == "staff:on" && seq.from == vx[0] && waitMsg == "yes"){
			let panjang = txt.split("");
			if(txt == "cancel"){
				vx[0] = "";vx[1] = "";waitMsg = "no";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"#CANCELLED");
			}else if(cot[1]){
				let ment = seq.contentMetadata.MENTION;
			    let xment = JSON.parse(ment);let pment = xment.MENTIONEES[0].M;
				let msg = new Message();msg.to = seq.to;
				if(isStaff(pment)){
					waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
					msg.text = cot[1]+"Success add staff Sir...!";
					this._client.sendMessage(0,msg);
				}else{
					msg.text = "Success Staff add Sir..!";
					this._client.sendMessage(0, msg);
			        myStaff.push(pment);
					waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
				}
			}else if(seq.contentType == 13){
				let midnya = seq.contentMetadata.mid;let msg = new Message();msg.to = seq.to;
				if(isStaff(midnya)){
					waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
					msg.text = "";
					this._client.sendMessage(0, msg);
				}else{
					msg.text = "";
					this._client.sendMessage(0, msg);
			        myStaff.push(midnya);
					waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
				}
			}else if(panjang.length > 30 && panjang[0] == "u"){
				if(isStaff(txt)){
					waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
					this._sendMessage(seq,"Dia sudah masuk daftar stafflist...");
				}else{
					msg.text = "";
					this._client.sendMessage(0, msg);
			        myStaff.push(txt);
					waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
				}
			}else{
					this._sendMessage(seq,"Send Contact sir....!");
			}
		}

		if(txt == "staff:on" && isAdmin(seq.from)) {
			if(vx[2] == null || typeof vx[2] === "undefined" || !vx[2]){
			    waitMsg = "yes";
			    vx[0] = seq.from;vx[1] = txt;
			    this._sendMessage(seq,"Send Contact Sir...");
				vx[2] = "arg1";
				this._sendMessage(seq,"");
			}else{
				waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"#CANCELLED");
			}
		}

       if(txt == "staff:on"){
            if(isAdmin(seq.from))
            {
            }
            else if(isBot(seq.from))
            {
            }
          else
            {
            this._sendMessage(seq,"You are not Owner");
             }

      }
      
    if(vx[1] == "admin:on" && seq.from == vx[0] && waitMsg == "yes"){
			let panjang = txt.split("");
			if(txt == "cancel"){
				vx[0] = "";vx[1] = "";waitMsg = "no";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"#CANCELLED");
			}else if(cot[1]){
				let ment = seq.contentMetadata.MENTION;
			    let xment = JSON.parse(ment);let pment = xment.MENTIONEES[0].M;
				let msg = new Message();msg.to = seq.to;
				if(isAdmin(pment)){
					waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
					msg.text = cot[1]+"Success add Admin Sir...!";
					this._client.sendMessage(0,msg);
				}else{
					msg.text = "Success Admin add Sir..!";
					this._client.sendMessage(0, msg);
			        myAdmin.push(pment);
					waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
				}
			}else if(seq.contentType == 13){
				let midnya = seq.contentMetadata.mid;let msg = new Message();msg.to = seq.to;
				if(isAdmin(midnya)){
					waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
					msg.text = "";
					this._client.sendMessage(0, msg);
				}else{
					msg.text = "Success Admin add Sir..!";
					this._client.sendMessage(0, msg);
			        myAdmin.push(midnya);
					waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
				}
			}else if(panjang.length > 30 && panjang[0] == "u"){
				if(isAdmin(txt)){
					waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
					this._sendMessage(seq,"");
				}else{
					msg.text = "Success Admin add Sir..!";
					this._client.sendMessage(0, msg);
			        myAdmin.push(txt);
					waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
				}
			}else{
					this._sendMessage(seq,"Send Contact sir....!");
			}
		}

		if(txt == "admin:on" && isAdmin(seq.from)) {
			if(vx[2] == null || typeof vx[2] === "undefined" || !vx[2]){
			    waitMsg = "yes";
			    vx[0] = seq.from;vx[1] = txt;
			    this._sendMessage(seq,"Send Contact Sir...");
				vx[2] = "arg1";
				this._sendMessage(seq,"");
			}else{
				waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"#CANCELLED");
			}
		}

       if(txt == "admin:on"){
            if(isAdmin(seq.from))
            {
            }
            else if(isBot(seq.from))
            {
            }
          else
            {
            this._sendMessage(seq,"You are not Owner");
             }

      }

		if(vx[1] == "staff:expel" && seq.from == vx[0] && waitMsg == "yes"){
			let panjang = txt.split("");
			if(txt == "cancel"){
				vx[0] = "";vx[1] = "";waitMsg = "no";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"#CANCELLED");
			}else if(cot[1]){
				let ment = seq.contentMetadata.MENTION;
			    let xment = JSON.parse(ment);let pment = xment.MENTIONEES[0].M;
				let bang = new Message();bang.to = seq.to;
				if(isStaff(pment)){
					let ment = myStaff.indexOf(pment);
					if (ment > -1) {
                        myStaff.splice(ment, 1);
                    }
					waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
					bang.text = "Success Staff deleted Sir..!";
					this._client.sendMessage(0,bang);
				}else{
					bang.text = "!";
					this._client.sendMessage(0, bang);
				}
			}else if(seq.contentType == 13){
				let midnya = seq.contentMetadata.mid;let bang = new Message();bang.to = seq.to;
				if(isStaff(midnya)){
					let ment = myStaff.indexOf(midnya);
					if (ment > -1) {
                        myStaff.splice(ment, 1);
                    }
					waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
					bang.text = "";
					this._client.sendMessage(0,bang);
				}else{
					bang.text = "!";
					this._client.sendMessage(0, bang);
				}
			}else if(panjang.length > 30 && panjang[0] == "u"){
				let bang = new Message();bang.to = seq.to;
				if(isStaff(txt)){
					let ment = myStaff.indexOf(txt);
					if (ment > -1) {
                        myStaff.splice(ment, 1);
                    }
					waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
					bang.text = "";
					this._client.sendMessage(0,bang);
				}else{
					this._sendMessage(seq,"!");
				}
			}else{
				this._sendMessage(seq,"!");
			}
		}

		if(txt == "staff:expel" && isAdmin(seq.from)){
			if(vx[2] == null || typeof vx[2] === "undefined" || !vx[2]){
			    waitMsg = "yes";
			    vx[0] = seq.from;vx[1] = txt;
				seq.text = "";
				for(var i = 0; i < myStaff.length; i++){
					let orangnya = await this._getContacts([myStaff[i]]);
				    seq.text += "[wong-jombang-Admin List]\n\n☞ "+orangnya[0].displayName+"";
				}
				this._sendMessage(seq,seq.text);
			    this._sendMessage(seq,"Deleted Staff ?");
				vx[2] = "arg1";
			}else{
				waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"#CANCELLED");
		      }
       }

       if(txt == "staff:expel"){
            if(isAdmin(seq.from))
            {
            }
            else if(isBot(seq.from))
            {
            }
          else
            {
            this._sendMessage(seq,"You are not Owner..!");
             }

      }
      
    if(vx[1] == "admin:expel" && seq.from == vx[0] && waitMsg == "yes"){
			let panjang = txt.split("");
			if(txt == "cancel"){
				vx[0] = "";vx[1] = "";waitMsg = "no";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"#CANCELLED");
			}else if(cot[1]){
				let ment = seq.contentMetadata.MENTION;
			    let xment = JSON.parse(ment);let pment = xment.MENTIONEES[0].M;
				let bang = new Message();bang.to = seq.to;
				if(isAdmin(pment)){
					let ment = myAdmin.indexOf(pment);
					if (ment > -1) {
                        myAdmin.splice(ment, 1);
                    }
					waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
					bang.text = "Success Admin deleted Sir..!";
					this._client.sendMessage(0,bang);
				}else{
					bang.text = "!";
					this._client.sendMessage(0, bang);
				}
			}else if(seq.contentType == 13){
				let midnya = seq.contentMetadata.mid;let bang = new Message();bang.to = seq.to;
				if(isAdmin(midnya)){
					let ment = myAdmin.indexOf(midnya);
					if (ment > -1) {
                        myAdmin.splice(ment, 1);
                    }
					waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
					bang.text = "";
					this._client.sendMessage(0,bang);
				}else{
					bang.text = "!";
					this._client.sendMessage(0, bang);
				}
			}else if(panjang.length > 30 && panjang[0] == "u"){
				let bang = new Message();bang.to = seq.to;
				if(isAdmin(txt)){
					let ment = myAdmin.indexOf(txt);
					if (ment > -1) {
                        myAdmin.splice(ment, 1);
                    }
					waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
					bang.text = "";
					this._client.sendMessage(0,bang);
				}else{
					this._sendMessage(seq,"!");
				}
			}else{
				this._sendMessage(seq,"!");
			}
		}

		if(txt == "admin:expel" && isAdmin(seq.from)){
			if(vx[2] == null || typeof vx[2] === "undefined" || !vx[2]){
			    waitMsg = "yes";
			    vx[0] = seq.from;vx[1] = txt;
				seq.text = "";
				for(var i = 0; i < myAdmin.length; i++){
					let orangnya = await this._getContacts([myAdmin[i]]);
				    seq.text += "[wong-jombang-Admin List]\n\n☞ "+orangnya[0].displayName+"";
				}
				this._sendMessage(seq,seq.text);
			    this._sendMessage(seq,"Deleted Admin ?");
				vx[2] = "arg1";
			}else{
				waitMsg = "no";vx[0] = "";vx[1] = "";vx[2] = "";vx[3] = "";
				this._sendMessage(seq,"#CANCELLED");
		      }
       }

       if(txt == "admin:expel"){
            if(isAdmin(seq.from))
            {
            }
            else if(isBot(seq.from))
            {
            }
          else
            {
            this._sendMessage(seq,"You are not Owner..!");
             }

      }

		if(txt == "adminlist"){
			seq.text = "[wong-jombang-List Admin]\n";
			for(var i = 0; i < myAdmin.length; i++){
			    let admin = await this._getContacts([myAdmin[i]]);
            seq.text += "\n☞ "+admin[0].displayName+"";
			}
			this._sendMessage(seq,seq.text);
		}

		if(txt == "stafflist"){
			seq.text = "[wong-jombang-List Staff]\n";
			for(var i = 0; i < myStaff.length; i++){
			    let staff = await this._getContacts([myStaff[i]]);
            seq.text += "\n☞ "+staff[0].displayName+"";
			}
			this._sendMessage(seq,seq.text);
		}

        if(txt == 'infogroup') {
           this._sendMessage(seq, 'Nama Group :\n'+ginfo.name+'\n\nGroup ID :\n'+ginfo.id+'\n\nPembuat Group :\n'+ginfo.creator.displayName);
         }

        if(txt == 'responsename') {
           if(isAdmin(seq.from) || isStaff(seq.from)) {
            this._sendMessage(seq, 'wong-jombang');
           }
        }

       if(txt == "responsename"){
            if(isAdmin(seq.from))
            {
  Zaaa          }
            else if(isBot(seq.from))
            {
            }
            else if(isStaff(seq.from))
            {
            }
          else
            {
            this._sendMessage(seq,"You are Not admin..!");
             }

      }
      
      if(txt == 'key') {
			let botOwner = await this._client.getContacts([toLga[0]]);
            let { mid, displayName } = await this._client.getProfile();
			let key2 = "\n\
====================\n\
| BotName   : "+displayName+"\n\
| BotID     : \n["+mid+"]\n\
| BotStatus : Working\n\
| BotOwner  : "+botOwner[0].displayName+"\n\
====================\n";
			seq.text = key2 += this.keyhelp;
			this._client.sendMessage(0, seq);
		}
			
		if(txt == "refresh" && isAdmin(seq.from_)){
			this._sendMessage(seq, "Clean all message....");
			await this.removeAllMessages();
			this._sendMessage(seq, "Done !");
		}
		     
        //if(txt == 'tcfs:help') {
           //this._sendMessage(seq, '==============================\nτȻ | ʃȘ  в̴̡̛͈̖̺͖̙̝̩̞̐̂̀͂̏̚͟͠σ̊̑̾͘т ¢̵̧͔̟̫̰̮̺̟̥̂̋̂͋͐͛͑̔̚̚σ̷̧̺̠̰̳̿́͆̕̕͠ͅ ῃ̶͖̜̻̰͍̮̼̒́̐̑͒́̕т̧̢̯̱͕̠͙̤̙̄̂͗̊̈́̕я̶̛̙̩̱̗̯͌̈͆̆σ̴̡̛͈̖̺͖̙̝̩̞̐̂̀͂̏̚͟͠ℓ̡̩̣̲̣̜̊̑̾̾͊̃͘͜ͅαll cσmmαnd\n==============================\n[1]☞Glist\n[2]☞Myid\n[3]☞ τȻ | ʃȘ:Gift\n[4]☞ Hello\n[5]☞ τȻ | ʃȘ:Help\n[6]☞ τȻ | ʃȘ:CreatorBot\n[7]☞ τȻ | ʃȘ:InfoGroup\n[8]☞ τȻ | ʃȘ:GroupCreator\n[9]☞ Mentionall\n[10]☞ τȻ | ʃȘ:Speed\n[11]☞ Setpoint\n[12]☞ Wiewlastseen\n[13]☞ τȻ | ʃȘ:Status/Setting\n[14]☞τȻ | ʃȘ:Cancel\n[15]☞ τȻ | ʃȘ:Banlist\n[16]☞ τȻ | ʃȘ:CekID\n[17]☞ τȻ | ʃȘ:StaffList\n[18]☞ τȻ | ʃȘ:AdminList\n[19]☞ τȻ | ʃȘ:GroupList\n[20]\n\n==============================\nτȻ | ʃȘ  в̴̡̛͈̖̺͖̙̝̩̞̐̂̀͂̏̚͟͠σ̊̑̾͘т ¢̵̧͔̟̫̰̮̺̟̥̂̋̂͋͐͛͑̔̚̚σ̷̧̺̠̰̳̿́͆̕̕͠ͅ ῃ̶͖̜̻̰͍̮̼̒́̐̑͒́̕т̧̢̯̱͕̠͙̤̙̄̂͗̊̈́̕я̶̛̙̩̱̗̯͌̈͆̆σ̴̡̛͈̖̺͖̙̝̩̞̐̂̀͂̏̚͟͠ℓ̡̩̣̲̣̜̊̑̾̾͊̃͘͜ͅ ѕтαff ¢σммαи∂\n==============================\n[21]☞ Response Name\n[22]☞ τȻ | ʃȘ:OpenUrl\n[23]☞ τȻ | ʃȘ:CloseUrl\n[24]☞ τȻ | ʃȘ @Bye\n[25]☞ τȻ | ʃȘ:spam\n[26]☞ ╔BlockKick On/Off\n[27]☞ ┗Kickall:on On/Off\n[28]☞ ╔ProtectCancel On/Off\n[29]☞ ┗Cancelall:on On/Off\n[30]☞ ╔BLockinvite On/Off\n[31]☞ ┗İnviteall:on On/Off\n[32]☞ ╔BLockJoin On/Off \n[33]☞ ┗Joinall:on On/Off\n[34]☞ BLockUpdateGroup On/Off\n[35]☞ BLockCancel On/Off\n[36]☞ τȻ | ʃȘ:Kick「@」\n[37]☞ τȻ | ʃȘ:Msg\n[38]☞ τȻ | ʃȘ:Ban\n[39]☞ τȻ | ʃȘ:Unban\n[40]☞ Bmsg On/Off\n[41]☞ τȻ | ʃȘ:Change:NameGroup [Name]\n\n==============================\nτȻ | ʃȘ  в̴̡̛͈̖̺͖̙̝̩̞̐̂̀͂̏̚͟͠σ̊̑̾͘т ¢̵̧͔̟̫̰̮̺̟̥̂̋̂͋͐͛͑̔̚̚σ̷̧̺̠̰̳̿́͆̕̕͠ͅ ῃ̶͖̜̻̰͍̮̼̒́̐̑͒́̕т̧̢̯̱͕̠͙̤̙̄̂͗̊̈́̕я̶̛̙̩̱̗̯͌̈͆̆σ̴̡̛͈̖̺͖̙̝̩̞̐̂̀͂̏̚͟͠ℓ̡̩̣̲̣̜̊̑̾̾͊̃͘͜ͅ α∂мιи ¢σммαи∂\n==============================\n[42]☞ Join [LinkGroup]\n[43]☞ τȻ | ʃȘ:Mute\n[44]☞ τȻ | ʃȘ:Unmute\n[45]☞ Admin:on | Staff:on\n[46]☞ Admin:expel | Staff:expel\n[47]☞ τȻ | ʃȘ:BroadcastGroup [Text]\n[48]☞ τȻ | ʃȘ:AddContact\n[49]☞ τȻ | ʃȘ:CreateGroup [Name]/[Mid]\n\n==============================\n฿Ɏ ₮Ɇ₳₥ τȻ | ʃȘ  в̴̡̛͈̖̺͖̙̝̩̞̐̂̀͂̏̚͟͠σ̊̑̾͘т ¢̵̧͔̟̫̰̮̺̟̥̂̋̂͋͐͛͑̔̚̚σ̷̧̺̠̰̳̿́͆̕̕͠ͅ ῃ̶͖̜̻̰͍̮̼̒́̐̑͒́̕т̧̢̯̱͕̠͙̤̙̄̂͗̊̈́̕я̶̛̙̩̱̗̯͌̈͆̆σ̴̡̛͈̖̺͖̙̝̩̞̐̂̀͂̏̚͟͠ℓ̡̩̣̲̣̜̊̑̾̾͊̃͘͜ͅ\n==============================');
       // }

         //if(txt == 'hak admin dan staff' || txt == 'hak staff dan admin') {
            //this._sendMessage(seq, 'Staff Bisa Memakai Command Yang Di Staff Dan All Tetapi Tidak Bisa Memakai Command Yang Di Admin Serta Tidak Bisa Inv Bot Ke Group Mana Pun (Isitilah Nya Kek CreatorGroup Siri Lah Tpi Tidak Bisa Change, Kalo Mao Change Perlu Minta Ke Admin)\n\nKalo Admin Bisa Memakai Command All, Staff, Admin Dan Membawa Bot Kemana Pun Tanpa Limit (Kecuali Situ Limit Inv)\n\n-тєαм αиυ вσт-');
         //}

         if(txt == "glist" || txt == "grouplist") {
            seq.text = "==============================\n🏠 Group List 🏠\n==============================\n\n";
         let gid = await this._getGroupsJoined();
           for(var i = 0; i < gid.length; i++){
			     let group = await this._getGroups([gid[i]]);
			       seq.text += "[•] "+group[0].name+" | "+group[0].members.length+" Members♪\n";
          }
	             seq.text += "\nTotal : "+gid.length+" Groups Joined♪";
                seq.text += "\n\n==============================\nwong-jombang\n=============================="
			       this._sendMessage(seq,seq.text);
	      }

         if(txt == 'status') {
            this._sendMessage(seq,`™Cyͨʸbᵇeͤrͬ〤⌨: \n${JSON.stringify(this.stateStatus)}`);
          }
			    
    
		if(txt == "setting"){
			this.setState(seq,1)
		}

        if(txt == 'noob') {

           seq.contentType = 7
           seq.contentMetadata = {'STKID':'404','STKPKGID':'1','STKVER':'100'};
           this._client.sendMessage(3, seq);
          }
          
          if(txt == 'gift') {
             seq.contentType = 9
             seq.contentMetadata = {'PRDID': 'a0768339-c2d3-4189-9653-2909e9bb6f58','PRDTYPE': 'THEME','MSGTPL': '5'};
             this._client.sendMessage(1, seq);
          }

        if(txt == 'kickall:on') {
            if(isAdmin(seq.from)) {
            this._sendMessage(seq, 'Kick Staff only is enabled');
            }
            else if(isStaff(seq.from)) {
            this._sendMessage(seq, 'Kick Staff only is Enabled');
             }
             else if(isBot(seq.from)) {
             }
           else
             {
             this._sendMessage(seq, '>_<');
              }
        }


        if(txt == 'kickall:off') {
            if(isAdmin(seq.from)) {
            this._sendMessage(seq, 'Kick  normal is Allowed');
            }
            else if(isStaff(seq.from)) {
            this._sendMessage(seq, 'Kick Normal is Allowed');
             }
             else if(isBot(seq.from)) {
             }
           else
             {
             this._sendMessage(seq, '>_<');
              }
        }



        if(txt == 'cancelall:on') {
            if(isAdmin(seq.from)) {
            this._sendMessage(seq, 'Cancel Staff only is Enabled');
            }
            else if(isStaff(seq.from)) {
            this._sendMessage(seq, 'Cancel Staff only is Enabled');
             }
             else if(isBot(seq.from)) {
             }
           else
             {
             this._sendMessage(seq, '>_<');
              }
        }


        if(txt == 'cancelall:off') {
            if(isAdmin(seq.from)) {
            this._sendMessage(seq, 'Cancel Normal is Allowed');
            }
            else if(isStaff(seq.from)) {
            this._sendMessage(seq, 'Cancel Normal is Allowed');
             }
             else if(isBot(seq.from)) {
             }
           else
             {
             this._sendMessage(seq, '>_<');
              }
        }



        if(txt == 'inviteall:on') {
            if(isAdmin(seq.from)) {
            this._sendMessage(seq, 'İnvite Staff only is Enabled');
            }
            else if(isStaff(seq.from)) {
            this._sendMessage(seq, 'İnvite Staff only is Enabled');
             }
             else if(isBot(seq.from)) {
             }
           else
             {
             this._sendMessage(seq, '>_<');
              }
        }


        if(txt == 'inviteall:off') {
            if(isAdmin(seq.from)) {
            this._sendMessage(seq, 'İnvite Normal  is Allowed');
            }
            else if(isStaff(seq.from)) {
            this._sendMessage(seq, 'İnvite Normal  is Allowed');
             }
             else if(isBot(seq.from)) {
             }
           else
             {
             this._sendMessage(seq, '>_<');
              }
        }


        if(txt == 'joinall:on') {
            if(isAdmin(seq.from)) {
            this._sendMessage(seq, 'Join Staff only is Enabled');
            }
            else if(isStaff(seq.from)) {
            this._sendMessage(seq, 'Join Staff only is Enabled');
             }
             else if(isBot(seq.from)) {
             }
           else
             {
             this._sendMessage(seq, '>_<');
              }
        }


        if(txt == 'joinall:off') {
            if(isAdmin(seq.from)) {
            this._sendMessage(seq, 'Join Normal is Allowed');
            }
            else if(isStaff(seq.from)) {
            this._sendMessage(seq, 'Join Normal is Allowed');
             }
             else if(isBot(seq.from)) {
             }
           else
             {
             this._sendMessage(seq, '>_<');
              }
        }



        if(txt == 'hello') {
            if(isAdmin(seq.from)) {
            this._sendMessage(seq, 'Hello naber aciktim ben ya ( ´･ω･`)');
            }
            else if(isStaff(seq.from)) {
            this._sendMessage(seq, 'Hello naber aciktim ben ya ( ´･ω･`)');
             }
             else if(isBot(seq.from)) {
             }
           else
             {
             this._sendMessage(seq, '>_<');
              }
        }


        if(txt == 'speed') {
            const curTime = (Date.now() / 1000);
            await this._sendMessage(seq,'Already\nTaken %Sp\nDebug speed');
            const rtime = (Date.now() / 1000) - curTime;
            await this._sendMessage(seq, `${rtime} second`);
        }

        if(txt == 'mentionall') {
let { listMember } = await this.searchGroup(seq.to);
     const mentions = await this.mention(listMember);
        seq.contentMetadata = mentions.cmddata; await this._sendMessage(seq,mentions.names.join(''))
        }

      
        if(txt == 'setpoint') {
            this._sendMessage(seq, `To read Wiewlastseen`);
            this.removeReaderByGroup(seq.to);
        }

        if(txt == 'wiewlastseen'){

            let rec = await this.recheck(this.checkReader,seq.to);
            const mentions = await this.mention(rec);
            seq.contentMetadata = mentions.cmddata;
            await this._sendMessage(seq,mentions.names.join(''));
            
        }

         if (txt == 'groupcreator') {
             let gcreator = await this._getGroup(seq.to);
             seq.contentType = 13;
             seq.contentMetadata = {mid: gcreator.creator.mid, displayName: gcreator.creator.displayName};
             this._sendMessage(seq, '');
         }

        if(txt == 'creatorbot') {
           this._sendMessage(seq, '');
           seq.contentType=13;
           seq.contentMetadata = { mid: 'u6b34b703cbc5fc83cd1e5b6832a05352' };
           let font = await this._sendMessage(seq, '');
         }

        //if(seq.contentType == 13) {
            //seq.contentType = 0
            //this._sendMessage(seq,seq.contentMetadata.mid);
        //}


        if(txt == 'setpoint for check reader .') {
            this.searchReader(seq);
        }

        if(txt == 'clearall') {
            this.checkReader = [];
        }

		if(txt == "mute" && isAdmin(seq.from)) {
			this.stateStatus.mute = 1;
			this._sendMessage(seq,"(*´﹃｀*)")
		}
     
       if(txt == "mute" || txt == "unmute"){
            if(isAdmin(seq.from))
            {
            }
            else if(isBot(seq.from))
            {
            }
          else
            {
            this._sendMessage(seq,"You Are not admin..!");
             }

      }

       if(txt == "openurl" || txt == "closeurl" || txt == "spam" || txt == "@bye"){
            if(isAdmin(seq.from))
            {
            }
            else if(isBot(seq.from))
            {
            }
            else if(isStaff(seq.from))
            {
            }
          else
            {
            this._sendMessage(seq, "");
             }

      }

        const action = ['blockinvite on','blockinvite off','blockupdategroup on','blockupdategroup off','blockjoin on','blockjoin off','blockcancel on','blockcancel off','blockkick on','blockkick off','protectcancel on','protectcancel off','bmsg on','bmsg off']
        if(action.includes(txt)) {
            this.setState(seq)
        }
	
        if(txt == 'myid') {
            this._sendMessage(seq,`Mid ✒: ${seq.from}`);
        }

        const joinByUrl = ['openurl','closeurl'];
      if(joinByUrl.includes(txt) && isAdmin(seq.from)) {
            this._sendMessage(seq,``);
            let updateGroup = await this._getGroup(seq.to);
            updateGroup.preventJoinByTicket = true;
            if(txt == 'openurl') {
                updateGroup.preventJoinByTicket = false;
                const groupUrl = await this._reissueGroupTicket(seq.to)
                this._sendMessage(seq,`Link Group = line://ti/g/${groupUrl}`);
            }
            await this._updateGroup(updateGroup);
        }

        if(joinByUrl.includes(txt) && isStaff(seq.from)) {
            this._sendMessage(seq,``);
            let updateGroup = await this._getGroup(seq.to);
            updateGroup.preventJoinByTicket = true;
            if(txt == 'openurl') {
                updateGroup.preventJoinByTicket = false;
                const groupUrl = await this._reissueGroupTicket(seq.to)
                this._sendMessage(seq,`Link Group = line://ti/g/${groupUrl}`);
            }
            await this._updateGroup(updateGroup);
        }

   if(cmd == 'Join' && isAdmin(seq.from)) { 
            const [ ticketId ] = payload.split('g/').splice(-1);
            let { id } = await this._findGroupByTicket(ticketId);
            await this._acceptGroupInvitationByTicket(id,ticketId);
        }

           if(cmd == 'ChangeNameGroup' && isAdmin(seq.from)) {
                    let group = await this._getGroup(seq.to);
                    group.name = payload.replace('@','');
                    let change = await this._updateGroup(group);
                    this._sendMessage(seq, "Already Success Change GroupName : "+group.name+"");
            }

           if(cmd == 'ChangeNameGroup' && isStaff(seq.from)) {
                    let group = await this._getGroup(seq.to);
                    group.name = payload.replace('@','');
                    let change = await this._updateGroup(group);
                    this._sendMessage(seq, "Already Success Change GroupName : "+group.name+"");
            }

           if(cmd == 'Apakah') {
              let optreply_jawab=['Iya','Bisa Jadi','Tidak']
              let random3 = Math.floor(Math.random()*optreply_jawab.length);
              let reply_jawab=(optreply_jawab[random3]);                                this._sendMessage(seq, `${reply_jawab}`);
              }

        if(cmd == 'spam' && isStaff(seq.from)) {
            for(var i= 0; i < 10;  i++) {
               this._sendMessage(seq, 'I Love CyberTK');
        }
    }

        if(cmd == 'spam' && isAdmin(seq.from)) {
            for(var i= 0; i < 10;  i++) {
               this._sendMessage(seq, 'I Love CyberTK');
        }
    }
		
        if(txt == '@bye') {
           if(isAdmin(seq.from) || isStaff(seq.from)){                    
           let txt = await this._sendMessage(seq, "Good bye "+ginfo.name+"😘😘");
           this._leaveGroup(seq.to);
        }
    }

        //if(cmd == 'lirik') {
            //let lyrics = await this._searchLyrics(payload);
            //this._sendMessage(seq,lyrics);
        //}

        //if(cmd === 'ip') {
            //exec(`curl ipinfo.io/${payload}`,(err, res) => {
                //const result = JSON.parse(res);
                //if(typeof result.error == 'undefined') {
                    //const { org, country, loc, city, region } = result;
                    //try {
                        //const [latitude, longitude ] = loc.split(',');
                        //let location = new Location();
                        //Object.assign(location,{ 
                            //title: `Location:`,
                            //address: `${org} ${city} [ ${region} ]\n${payload}`,
                            //latitude: latitude,
                            //longitude: longitude,
                            //phone: null 
                        //})
                        //const Obj = { 
                            //text: 'Location',
                            //location : location,
                            //contentType: 0,
                        //}
                        //Object.assign(seq,Obj)
                        //this._sendMessage(seq,'Location');
                    //} catch (err) {
                        //this._sendMessage(seq,'Not Found');
                    //}
                //} else {
                    //this._sendMessage(seq,'Location Not Found , Maybe di dalem goa');
                //}
            //})
        //}
    }

}

module.exports = new LINE();
