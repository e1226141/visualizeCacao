MBB:0013 
0x00007fafa075cd78:   90                               nop
0x00007fafa075cd79:   b8 00 00 00 00                   mov    $0x0,%eax
0x00007fafa075cd7e:   b9 00 00 00 00                   mov    $0x0,%ecx
0x00007fafa075cd83:   8b 57 10                         mov    0x10(%rdi),%edx
MBB:0014 
0x00007fafa075cd86:   3b ca                            cmp    %edx,%ecx
0x00007fafa075cd88:   0f 8d 25 00 00 00                jge    0x00007fafa075cdb3
MBB:0015 
0x00007fafa075cd8e:   8b 77 10                         mov    0x10(%rdi),%esi
0x00007fafa075cd91:   3b ce                            cmp    %esi,%ecx
0x00007fafa075cd93:   0f 82 08 00 00 00                jb     0x00007fafa075cda1
0x00007fafa075cd99:   48 8b 0c 25 02 00 00 00          mov    0x2,%rcx
0x00007fafa075cda1:   8b 74 8f 18                      mov    0x18(%rdi,%rcx,4),%esi
0x00007fafa075cda5:   03 c6                            add    %esi,%eax
0x00007fafa075cda7:   be fe ff ff 7f                   mov    $0x7ffffffe,%esi
0x00007fafa075cdac:   03 ce                            add    %esi,%ecx
0x00007fafa075cdae:   e9 d3 ff ff ff                   jmpq   0x00007fafa075cd86
MBB:0016 
0x00007fafa075cdb3:   c3                               retq   
