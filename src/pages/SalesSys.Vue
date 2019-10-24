<template>
  <div id="registerAndLogin">
    <el-container>
      <el-header>
        <city-header v-bind:value="'SW10086'" v-bind:isLogin="false" v-on:log-out="logOut"></city-header>
      </el-header>
      <el-main>
        <h1>GFINet by Team 1</h1>
        <div class="sale-sys-main-content">
          <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:20px;">
            <el-breadcrumb-item :to="{ path: '/index' }">index</el-breadcrumb-item>
            <el-breadcrumb-item>salerSystem</el-breadcrumb-item>
          </el-breadcrumb>
          <el-popover placement="top-start" width="200" trigger="hover" content="add a new cusip">
            <el-button
              type="primary"
              style="float:left;"
              size="mini"
              slot="reference"
              @click="addDealSales"
            >Add Cusip</el-button>
          </el-popover>
          <el-table :data="tableData" stripe style="width:100%;">
            <el-table-column label type="expand">
              <template slot-scope="props">
                <el-table :data="props.row.deals" :row-class-name="tableRowClassName" border>
                  <el-table-column label type="expand">
                    <template slot-scope="props2">
                      <el-card class="box-card" shadow="always">
                        <div slot="header" class="clearfix">
                          <span>Sales Deal Info</span>
                          <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
                        </div>
                        <div class="text item">
                          <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="TxnI">
                              <span>{{ props2.row.salesDeal.txnI }}</span>
                            </el-form-item>
                            <el-form-item label="Trade Date">
                              <span>{{ props2.row.salesDeal.tradeDate }}</span>
                            </el-form-item>
                            <el-form-item label="Volume">
                              <span>{{ props2.row.salesDeal.volume }}</span>
                            </el-form-item>
                            <el-form-item label="Price">
                              <span>{{ props2.row.salesDeal.price }}</span>
                            </el-form-item>
                            <el-form-item label="Notional Price">
                              <span>{{ props2.row.salesDeal.totalPrice }}</span>
                            </el-form-item>
                            <el-form-item label="Dealer">
                              <span>{{ props2.row.salesDeal.receiver }}</span>
                            </el-form-item>
                            <el-form-item label="Version">
                              <span>{{ props2.row.salesDeal.version }}</span>
                            </el-form-item>
                            <el-form-item label="Status">
                              <span>{{ props2.row.salesDeal.status }}</span>
                            </el-form-item>
                            <el-form-item label="Note">
                              <span>{{ props2.row.salesDeal.note }}</span>
                            </el-form-item>
                          </el-form>
                        </div>
                      </el-card>
                    </template>
                  </el-table-column>
                  <el-table-column label="TxnI" prop="txnI"></el-table-column>
                  <el-table-column label="Trade Date" prop="tradeDate"></el-table-column>
                  <el-table-column label="Volume" prop="volume"></el-table-column>
                  <el-table-column label="Price" width="180" prop="price"></el-table-column>
                  <el-table-column label="NotionalPrice" prop="totalPrice"></el-table-column>
                  <el-table-column label="Dealer" prop="receiver"></el-table-column>
                  <el-table-column label="Version" prop="version"></el-table-column>
                  <el-table-column
                    label="Status"
                    prop="status"
                    :filters="statusFilter"
                    :filter-method="filterStatus"
                  >
                    <!--四个状态：1:requested 2:pending 3:processed 4:accepted-->
                    <template slot-scope="scope">
                      <el-tag
                        :type="scope.row.status === 'accepted' ? 'success' : scope.row.status==='rejected'?'danger':scope.row.status=='pending'?'warning':''"
                        disable-transitions
                      >{{scope.row.status}}</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column label="Note" prop="note"></el-table-column>
                </el-table>
                <el-popover placement="right" width="200" trigger="hover" content="add a new deal">
                  <el-button
                    type="primary"
                    style="float:left; margin-top:10px;"
                    size="mini"
                    slot="reference"
                    @click="openDialog(props.row)"
                  >Add Trade</el-button>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column label="Cusip" prop="cusip"></el-table-column>
            <el-table-column label="Volume" prop="volume"></el-table-column>
            <el-table-column label="No. of Trades" prop="noOfTrades"></el-table-column>
            <el-table-column label="Notes" prop="notes"></el-table-column>
          </el-table>
        </div>
      </el-main>
      <el-footer>
        <city-footer></city-footer>
      </el-footer>
    </el-container>
    <el-dialog title="Add one cusip" :visible.sync="dialogAddCusipVisible">
      <el-form :model="addCusipForm" label-position="top">
        <el-form-item label="cusipID">
          <el-select
            v-model="addCusipForm.cusipID"
            placeholder="please enter the cusip id"
            style="width:300px;"
            filterable
            remote
            :remote-method="remoteMethod"
            :loading="isSearching"
            @change="cusipIsSelected"
          >
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.cusip"
              :value="item.cusip"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddCusipVisible = false">Cancel</el-button>
        <el-button type="primary" @click="goToNext" :disabled="!isSelect">Confirm</el-button>
      </div>
    </el-dialog>
    <el-dialog title="Add one Deal" :visible.sync="dialogAddTraderDealVisible">
      <el-form :model="addTradeFlorm" label-position="top" inline>
        <el-form-item label="volume" :label-width="formLabelWidth">
          <el-input
            v-model="addTradeFlorm.volume"
            autocomplete="off"
            style="width:300px;"
            type="number"
            placeholder="please enter your volume"
          ></el-input>
        </el-form-item>
        <el-form-item label="price" :label-width="formLabelWidth">
          <el-input
            v-model="addTradeFlorm.price"
            autocomplete="off"
            style="width:300px;"
            type="number"
            placeholder="please enter your price"
          ></el-input>
        </el-form-item>
        <el-form-item label="note" :label-width="formLabelWidth">
          <el-input
            v-model="addTradeFlorm.note"
            autocomplete="off"
            style="width:300px;"
            placeholder="please enter your note"
          ></el-input>
        </el-form-item>
        <el-form-item label="receiver ID" :label-width="formLabelWidth">
          <el-select
            v-model="addTradeFlorm.receiver"
            placeholder="please enter your receiver"
            style="width:300px;"
            filterable
            remote
            :remote-method="remoteMethod2"
            :loading="isSearching2"
            @change="receiverIsSelected"
          >
            <el-option v-for="item in options2" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddTraderDealVisible = false">Cancel</el-button>
        <el-button type="primary" @click="addOneDealAsSales">Confirm</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import CityHeader from '@/components/CityHeader'
import CityFooter from '@/components/CityFooter'
export default {
  name: 'RegisterAndLogin',
  data() {
    return {
      statusFilter: [
        {
          text: 'accepted',
          value: 'accepted'
        },
        {
          text: 'processed',
          value: 'processed'
        },
        {
          text: 'pending',
          value: 'pending'
        },
        {
          text: 'requested',
          value: 'requested'
        }
      ],
      isSelect: false,
      receiverIsSelected: false,
      typeContent: 'primary',
      buttonContent: 'edit',
      iconContent: 'el-icon-edit',
      isDisabled: true,
      isSave: false,
      isSearching: false,
      isSearching2: false,
      formLabelWidth: '120px',
      dialogAddCusipVisible: false,
      dialogAddTraderDealVisible: false,
      addCusipForm: {
        cusipID: ''
      },
      options: [],
      options2: [],
      remoteList: [
      
      ],
      remoteList2: [

      ],
      addTradeFlorm: {
        productId: '',
        volume: '',
        price: '',
        receiver: '',
        note: ''
      },
      tableData: [
        {
          cusip: 'XY12345',
          volume: '1000',
          noOfTrades: 2,
          notes: 2,
          deals: [
            {
              txnI: 12348,
              tradeDate: '2019-01-22',
              volume: 400,
              price: 105,
              totalPrice: 105 * 400,
              receiver: 'S1111',
              version: 4,
              status: 'accepted',
              note: '',
              shouldBeMerge: false,
              salesDeal: {
                txnI: 12348,
                tradeDate: '2019-01-22',
                volume: 400,
                price: 105,
                totalPrice: 105 * 400,
                receiver: 'S1111',
                version: 4,
                status: 'accepted',
                note: ''
              }
            },
            {
              txnI: 12349,
              tradeDate: '2019-01-22',
              volume: 600,
              price: 105,
              totalPrice: 105 * 600,
              receiver: 'S1112',
              version: 2,
              status: 'pending',
              note: '',
              shouldBeMerge: true,
              salesDeal: {
                txnI: 12348,
                tradeDate: '2019-01-22',
                volume: 400,
                price: 105,
                totalPrice: 105 * 400,
                receiver: 'S1111',
                version: 4,
                status: 'accepted',
                note: ''
              }
            }
          ]
        }
      ]
    }
  },
  components: {
    'city-header': CityHeader,
    'city-footer': CityFooter
  },
  created() {},
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (row.shouldBeMerge) {
        console.log('tag', row.shouldBeMerge)
        return 'warning-row'
      }
      return ''
    },
    remoteMethod(query) {
      if (query !== '') {
        this.isSearching = true
        this.axios
          .get('http://47.100.138.62:8080/api/products')
          .then(response => {
            this.isSearching = false
            this.remoteList = response.data
            this.options = this.remoteList.filter(item => {
              return (
                item.cusip.indexOf(query.toLowerCase()) > -1 ||
                item.id.toString().indexOf(query.toLowerCase()) > -1
              )
            })
          })
          .catch(function(error) {
            // 请求失败处理
            console.log(error)
          })
      } else {
        this.options = []
      }
    },
    remoteMethod2(query) {
      if (query !== '') {
        this.isSearching2 = true
        this.axios
          .get('http://47.100.138.62:8080/api/users')
          .then(response => {
            console.log('resposnew', response)
            this.isSearching2 = false
            this.remoteList2 = response.data
            this.options2 = this.remoteList2.filter(item => {
              return (
                item.name.indexOf(query.toLowerCase()) > -1 ||
                item.id.toString().indexOf(query.toLowerCase()) > -1
              )
            })
          })
          .catch(function(error) {
            // 请求失败处理
            console.log(error)
          })
      } else {
        this.options = []
      }
    },
    logOut() {
      window.localStorage.clear()
      this.$router.replace({ path: '/index' })
    },
    filterStatus(value, row) {
      return row.status === value
    },
    addOneDealAsSales() {
      this.dialogAddTraderDealVisible = false
      //  调用接口
      var params = new URLSearchParams()
      params.append('productId', this.addTradeFlorm.productId)
      params.append('receiverId', this.addTradeFlorm.receiver)
      params.append('senderId', 1)
      params.append('price', this.addTradeFlorm.price)
      params.append('volume', this.addTradeFlorm.volume)
      this.axios
        .post('http://47.100.138.62:8080/api/salerDeal', params)
        .then(response => {
          console.log('response', response)
          this.dialogAddTraderDealVisible = false
          var tempData = response.data
          console.log('responseData', tempData)
          alert('交易发起成功')
        })
        .catch(function(error) {
          // 请求失败处理
          console.log(error)
        })
    },
    openDialog(row) {
      this.dialogAddTraderDealVisible = true
      this.addTradeFlorm.productId = row.txnI
    },
    addDealSales() {
      this.dialogAddCusipVisible = true
    },
    cusipIsSelected() {
      this.isSelect = true
    },
    receiverIsSelected() {
      this.receiverIsSelected = true
    },
    goToNext() {
      this.dialogAddCusipVisible = false
      this.dialogAddTraderDealVisible = true
      this.addTradeFlorm.productId = this.addCusipForm.cusipID
    }
  }
}
</script>
<style>
.el-footer {
  position: relative;
}
.el-container {
  height: 100%;
}
.el-table .warning-row {
  background: oldlace;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 180px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.clearfix {
  font-size: 25px;
  font-style: italic;
}
.el-dialog {
  text-align: left;
}
</style>
